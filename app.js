const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const pool = require('./db'); // Ajusta la ruta si está en otra carpeta
require('dotenv').config(); // Para cargar las variables de entorno

const app = express();
const router = require('./router');

// Configuración de middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de sesiones en memoria (no recomendado en producción, pero suficiente para pruebas)
app.use(
    session({
        secret: 'my_secret_key',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());

// Variables locales para mensajes flash
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

// Configuración del motor de vistas
app.set('view engine', 'ejs');

// Rutas
app.use('/', router);

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
});
