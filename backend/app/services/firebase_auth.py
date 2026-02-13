# backend/app/services/firebase_auth.py
import firebase_admin
from firebase_admin import credentials, auth
import os

# Carga las credenciales de forma segura
# Para desarrollo local, busca el archivo JSON.
# Para Cloud Run, se basará en la variable de entorno GOOGLE_APPLICATION_CREDENTIALS.
if os.path.exists('firebase-credentials.json'):
    cred = credentials.Certificate('firebase-credentials.json')
else:
    cred = credentials.ApplicationDefault()

# Inicializa la app de Firebase solo si no ha sido inicializada antes
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

def verify_firebase_token(token: str) -> dict | None:
    """
    Verifica un token de ID de Firebase.
    Devuelve el payload decodificado del token si es válido, de lo contrario None.
    """
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"Error al verificar el token: {e}")
        return None