@echo off
echo 🛑 Deteniendo el Proyecto Completo (Backend + Frontend)...

:: Detener el backend (Java en el puerto 8080)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do taskkill /PID %%a /F 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Backend detenido correctamente.
) else (
    echo ⚠ No se encontró el proceso del backend en el puerto 8080.
)

:: Detener el frontend (Node.js en el puerto 5173)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do taskkill /PID %%a /F 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Frontend detenido correctamente.
) else (
    echo ⚠ No se encontró el proceso del frontend en el puerto 5173.
)

echo ✅ Todos los servicios han sido detenidos.
pause
