@echo off
echo 🚀 Iniciando el Proyecto Completo (Backend + Frontend)...

:: Verificar que Java está instalado
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Java no está instalado. Instálalo y vuelve a intentar.
    exit /b
)

:: Verificar que Maven está instalado
mvn -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Maven no está instalado. Instálalo y vuelve a intentar.
    exit /b
)

:: Verificar que Node.js está instalado
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado. Instálalo y vuelve a intentar.
    exit /b
)

:: Configurar variables de entorno
set DB_USERNAME=root
set DB_PASSWORD=letsi

:: Compilar el backend si el JAR no existe
if not exist "backend.jar" (
    echo 📦 Compilando el backend...
    cd Backend\Ben10API
    mvn clean package -DskipTests
    cd ..\..
    copy Backend\Ben10API\target\*.jar backend.jar
)

:: Iniciar el backend
echo 🔥 Iniciando el backend...
start /B java -jar backend.jar

:: Esperar unos segundos para que el backend inicie antes de correr el frontend
timeout /t 5 /nobreak >nul

:: Iniciar el frontend
echo 🌐 Iniciando el frontend...
cd Frontend\"gestor Omnitrix"
npm install
npm run dev
