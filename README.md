## 🛠 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas en tu sistema operativo:

### 🖥️ **Requisitos del Sistema**
✅ **Node.js** (versión recomendada: `22.x` o superior)  
✅ **npm**  
✅ **Git**   
✅ **MySQL** (version LTS )
#### ✅ **Java 17 o superior**

   - Instalar el **JDK (Java Development Kit)**   
   - Configurar la **variable de entorno `JAVA_HOME`** apuntando a la carpeta de instalación del JDK.  
   - Verificar la instalación con:  
     ```sh
     java -version
     echo $JAVA_HOME  # Linux/macOS
     echo %JAVA_HOME%  # Windows
     ```  
✅ **Maven**
   - Verificar la instalación con:  
     ```sh
     mvn -version
     ```  


> ⚠ **Advertencia:** Antes de ejecutar el script, asegúrate de:
> - Modificar las **variables de entorno** en los archivos `run.sh` y `run.bat` segun el caso:
>   - `DB_USERNAME` → Usuario de la base de datos.
>   - `DB_PASSWORD` → Contraseña de la base de datos.
> - Verificar que **MySQL está corriendo** en el puerto correcto (`3306` por defecto).
> - En **Windows**, ejecutar el script como **Administrador**.
> - En **Linux/macOS**, dar permisos con `chmod +x run.sh stop.sh`.

---

## 🚀 Cómo Ejecutar el Proyecto

### **🔹 En Linux/macOS**
1️⃣ **Dar permisos de ejecución a los scripts** *(solo la primera vez)*:
```sh
chmod +x run.sh stop.sh
```
2️⃣ **Ejecutar el proyecto (Backend + Frontend)**:
```sh
./run.sh
```

*Esto compilará el backend (si no está compilado), lo ejecutará y luego iniciará el frontend.*

3️⃣ **Para detener el proyecto**:

```sh
./stop.sh
```

*Este comando cerrará tanto el backend como el frontend.*

### **🔹 En Windows**

1️⃣ **Ejecutar CMD como Administrador** *(Recomendado para evitar problemas de permisos).📌 Presiona Win + S y busca "Símbolo del sistema" → Clic derecho → Ejecutar como administrador.*

2️⃣ **Ejecutar el proyecto (Backend + Frontend)**:
```sh
run.bat
```

*Esto compilará el backend (si no está compilado), lo ejecutará y luego iniciará el frontend.*

3️⃣ **Para detener el proyecto**:
```sh
stop.bat
```

*Este comando cerrará tanto el backend como el frontend.*

📂 Estructura del Repositorio
```sh
/root-repositorio
  ├─ backend.jar   # JAR generado de Spring Boot
  ├─ frontend/     # Carpeta con archivos del frontend (React)
  ├─ run.sh        # Script de inicio para Linux/macOS
  ├─ stop.sh       # Script para detener los servicios en Linux/macOS
  ├─ run.bat       # Script de inicio para Windows
  ├─ stop.bat      # Script para detener los servicios en Windows
```

### 🔥 Verificación del Estado del Proyecto

#### 📌 Para verificar que el backend está corriendo, abre en el navegador:

http://localhost:8080

#### 📌 Para verificar que el frontend está corriendo, abre en el navegador:

http://localhost:5173