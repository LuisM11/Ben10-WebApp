@echo off
echo 🚀 Iniciando el Proyecto Completo (Backend + Frontend)...

:: Verificar que Java está instalado
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Java no está instalado. Instálalo y vuelve a intentar.
    pause
    exit /b
)
echo ✅ Java encontrado.



:: Verificar que Maven está instalado
call mvn --batch-mode -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Maven no está instalado. Instálalo y vuelve a intentar.
    pause
    exit /b
)
echo ✅ Maven encontrado.

:: Verificar que Node.js está instalado
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado. Instálalo y vuelve a intentar.
    pause
    exit /b
)
echo ✅ Node.js encontrado.

:: Configurar variables de entorno
set DB_USERNAME=root
set DB_PASSWORD=letsi
echo ✅ Variables de entorno configuradas.

:: Compilar el backend si el JAR no existe
if not exist "backend.jar" (
    echo 📦 Compilando el backend...
    cd Backend\Ben10API
    call mvn clean package -DskipTests
    cd ..\..
    copy /Y Backend\Ben10API\target\Ben10API-0.0.1-SNAPSHOT.jar backend.jar
    echo ✅ Backend compilado correctamente.
    pause
)

:: Iniciar el backend
echo 🔥 Iniciando el backend...
start /B java -jar backend.jar > backend.log 2>&1
echo ✅ Backend iniciado.

:: Esperar unos segundos antes de iniciar el frontend
timeout /t 5 /nobreak >nul

:: Iniciar el frontend
echo 🌐 Iniciando el frontend...
cd Frontend\"gestor Omnitrix"
start /B npm install --silent --no-audit --no-fund
echo ✅ npm install terminado. Ahora iniciando Vite...
npm run dev
echo ✅ Frontend iniciado correctamente.

pause
