# backend/app/api/v1/deps.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.services.firebase_auth import verify_firebase_token
from app.db.session import AsyncSessionLocal
from app.db.models import User

# La URL 'token' es nominal, ya que la obtención del token se hará en el frontend.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    decoded_token = verify_firebase_token(token)
    if not decoded_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales de autenticación inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    uid = decoded_token.get("uid")
    
    # Busca al usuario en tu base de datos local
    result = await db.execute(select(User).where(User.firebase_uid == uid))
    user = result.scalars().first()

    # Si el usuario no existe en tu DB, créalo automáticamente.
    # Esto simplifica el registro: el usuario se crea en nuestra DB en su primer login.
    if not user:
        user = User(
            firebase_uid=uid,
            email=decoded_token.get("email")
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return user