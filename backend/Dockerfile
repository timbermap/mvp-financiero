# backend/Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code
ENV PYTHONPATH=/code

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# --- CAMBIO IMPORTANTE ---
# Forzamos la copia de la carpeta app.
# Si la carpeta no existe en el contexto, el BUILD fallará aquí mismo
# y nos dará un error mucho más claro que "Service Unavailable".
COPY ./app /code/app

# Copiamos la carpeta jobs también por si acaso
COPY ./jobs /code/jobs

ENV PORT 8080

# Diagnóstico final: Listamos TODO lo que hay en /code recursivamente
# y luego intentamos arrancar.
CMD ["sh", "-c", "echo '--- LISTADO DE /code ---'; ls -R /code; echo '--- ARRANCANDO ---'; gunicorn -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8080 app.main:app"]