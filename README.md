[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xsUuW6PJ)
# Template

Template para proyectos monorepo con **Nextjs**, **Express**, **MongoDB** y **Docker**.

## 📚 Documentación

- **Backend:** Para información completa sobre la API de backend, consulta la [documentación completa del backend](./backend/src/README.md).
- **Frontend:** Para información sobre cómo lanzar y usar el frontend, consulta la [documentación del frontend](./frontend/README.md).

## Descripción del proyecto
FlightBoard es una aplicación web desarrollada con Next.js y Node.js que permite consultar información sobre vuelos, registrarse e iniciar sesión mediante autenticación de usuarios.

La aplicación está dirigida a usuarios que deseen consultar vuelos disponibles y gestionar su cuenta de forma sencilla. Además, incorpora funcionalidades de autenticación y un sistema de soporte mediante chat en tiempo real.

## Cómo ejecutar en local
### Requisitos
- Node.js 20 o superior
- pnpm 10 o superior
- Docker Desktop
- Git

### Clonar el repositorio
```bash
   git clone <url-del-repositorio>
   cd <nombre-de-la-carpeta>
   ```
### Instalación de dependencias
Backend:

```
cd backend
pnpm install
```
Frontend:
```
cd frontend
pnpm install
```
### Variables de entorno
#### Backend (.env)
Crear un archivo ``.env`` dentro de la carpeta ``backend``:

PORT=4000
MONGO_URI=mongodb://root:root@mongo:27017
JWT_SECRET=your_secret_key


#### Frontend (.env.local)
Crear un archivo ``.env.local`` dentro de la carpeta ``frontend``:

NEXT_PUBLIC_API_URL=http://localhost:4000

También se recomienda incluir los archivos:

- .env.example
- .env.local.example

con valores de ejemplo para facilitar la configuración del proyecto.


### Arrancar la aplicación con Docker
Desde la raíz del proyecto:

``docker compose up --build``

Servicios disponibles:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Mongo Express: http://localhost:8081

### Uso de Inteligencia Artificial

Durante el desarrollo de esta práctica se han utilizado herramientas de Inteligencia Artificial, principalmente Gemini, Chatgpt como apoyo para la comprensión de conceptos y la resolución de problemas técnicos y textos.

La IA se ha empleado para consultar dudas relacionadas con React y Next.js, comprender mejor el funcionamiento de determinados componentes y hooks, así como para identificar errores, analizar mensajes de depuración y proponer posibles soluciones. También ha sido útil para resolver incidencias relacionadas con la configuración del entorno, las variables de entorno, la comunicación entre frontend y backend y el uso de Docker.
