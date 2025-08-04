# Inmobiliaria Leal

Plataforma web para gestión y visualización de propiedades inmobiliarias, desarrollada con **React** (frontend) y **Node.js + Express + MySQL** (backend).

---

## 🚀 Características principales

- **Catálogo público** de propiedades con filtros avanzados.
- **Detalle de propiedad** con información completa y formulario de contacto.
- **Panel de administración** protegido para empleados y administradores.
- **Seguridad**: solo usuarios autorizados pueden crear, editar o eliminar propiedades.
- **Diseño responsivo** y coherente con la marca.
- **Formulario de contacto** para consultas de clientes.

---

## 🛠️ Tecnologías utilizadas

- **Frontend:** React, Axios, Context API, CSS moderno.
- **Backend:** Node.js, Express, Sequelize (ORM), MySQL.
- **Autenticación:** JWT (JSON Web Token).
- **Otros:** Dotenv, Cors.

---

## ⚙️ Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/inmobiliaria-leal.git
cd inmobiliaria-leal
```

---

## Configura el frontend
* Crea un archivo .env en la carpeta /frontend:
 REACT_APP_API_URL=http://localhost:5000/api

* Instala dependencias y ejecuta el frontend:
```bash
Copy
cd ../frontend
npm install
npm start
```

---


## 👤 Acceso a panel de empleados
* Accede desde el botón "Acceso empleados" en la barra de navegación.
* Solo usuarios con rol admin o super_admin pueden gestionar propiedades.

---

##📦 Estructura del proyecto
/backend
  /controllers
  /models
  /routes
  /middlewares
  server.js
/frontend
  /src
    /components
    /contexts
    /services
    App.js
    index.js
  .env

---


## 📝 Notas
* El catálogo público solo muestra propiedades con status: "disponible".
* El panel de administración permite crear, editar y eliminar propiedades.

---

## 📧 Contacto
Desarrollado por JhoanDev, JesusDev, AlexDev
Correo: JhoanS5.ING@gmail.com