const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const pool = require('./database/db'); // Ajusta la ruta a la ubicación del archivo db.js
require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env

const app = express();
const router = require('./router'); // Importa el archivo de rutas

// Configuración de middlewares
app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios
app.use(express.static('public')); // Para servir archivos estáticos como CSS, JS, imágenes, etc.

// Configuración de sesiones (ajustada para producción usando PostgreSQL si es necesario)
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'my_secret_key', // Usa una variable de entorno para el secreto de sesión
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Cambia a true si usas HTTPS
    })
);

app.use(flash()); // Para mensajes flash

// Variables locales para mensajes flash (disponibles en todas las vistas)
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

// Configuración del motor de vistas
app.set('view engine', 'ejs'); // Usa EJS como motor de plantillas

// Rutas
app.use('/', router); // Define las rutas principales

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000; // Usa el puerto definido en el entorno o por defecto el 3000
app.listen(PORT, () => {
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
});

module.exports = app; // Exporta la app para pruebas o configuraciones adicionales