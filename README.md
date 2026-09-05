# Hybridge Blog API 🚀

API RESTful desarrollada con Node.js, Express y Sequelize, estructurada bajo un patrón modular y diseñada con capas de seguridad avanzadas para entornos de producción.

## 🛠️ Tecnologías y Dependencias
* **Node.js** & **Express**: Entorno de ejecución y framework web.
* **Sequelize ORM**: Gestión y mapeo de base de datos relacional.
* **Passport.js & JWT**: Sistema de autenticación basada en tokens.
* **Helmet**: Protección de cabeceras HTTP de seguridad.
* **CORS**: Control estricto de recursos de origen cruzado.
* **Express Rate Limit**: Prevención de ataques de fuerza bruta y limitación de peticiones.
* **Sanitización de datos**: Prevención de inyecciones maliciosas.

## 📁 Estructura del Proyecto

hybridge-blog-api/
├── config/        # Configuración de base de datos y Passport
├── middlewares/   # Capas de autenticación y seguridad
├── migrations/    # Migraciones de Sequelize
├── models/        # Modelos de datos (Author, Post)
├── routes/        # Endpoints modulares (auth, authors, posts)
├── .env           # Variables de entorno (Oculto en producción)
├── .gitignore     # Archivos ignorados por Git
└── index.js       # Punto de entrada principal de la aplicación


## ⚙️ Configuración y Ejecución Local

1. Clona el repositorio:
   git clone https://github.com/TU_USUARIO/hybridge-blog-api.git

2. Instala las dependencias:
   npm install

3. Configura tu archivo `.env` basado en tus credenciales locales.

4. Ejecuta las migraciones y arranca el servidor:
   npm start

## 🛡️ Capas de Seguridad Implementadas
* **Helmet** para asegurar cabeceras HTTP.
* **Rate Limiting** para restringir solicitudes masivas por IP.
* **CORS** parametrizado para admitir dominios autorizados.
* **Autenticación JWT** protegiendo los métodos de escritura (POST, PUT, PATCH, DELETE).

Este proyecto está bajo la [Licencia MIT](LICENSE).