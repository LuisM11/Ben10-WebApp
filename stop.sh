#!/bin/bash

echo "🛑 Deteniendo Backend..."
kill $(lsof -t -i:8080)

echo "🛑 Deteniendo Frontend..."
kill $(lsof -t -i:5173)

echo "✅ Todos los servicios han sido detenidos."
