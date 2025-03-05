#!/bin/bash

echo "🚀 Iniciando el Proyecto Completo (Backend + Frontend)..."

# Verificar Java instalado
if ! command -v java &> /dev/null
then
    echo "❌ Java no está instalado. Instálalo y vuelve a intentar."
    exit 1
fi

# Verificar Maven instalado
if ! command -v mvn &> /dev/null
then
    echo "❌ Maven no está instalado. Instálalo y vuelve a intentar."
    exit 1
fi

# Verificar Node.js instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Instálalo y vuelve a intentar."
    exit 1
fi

# Configurar variables de entorno
export DB_USERNAME="root"
export DB_PASSWORD="letsi"

# Compilar el backend si el JAR no existe
if [ ! -f "backend.jar" ]; then
    echo "📦 Compilando el backend..."
    cd Backend/Ben10API
    mvn clean package -DskipTests
    cd ../../
    cp Backend/Ben10API/target/*.jar backend.jar
fi

# Iniciar el backend
echo "🔥 Iniciando el backend..."
java -jar backend.jar &

# Esperar unos segundos para que el backend inicie antes de correr el frontend
sleep 5

# Iniciar el frontend
echo "🌐 Iniciando el frontend..."
cd Frontend/'gestor Omnitrix'
npm install
npm run dev
