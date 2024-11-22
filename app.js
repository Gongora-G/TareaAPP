const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const PgSession = require('connect-pg-simple')(session); // Para usar PostgreSQL como almacenamiento de sesiones
const { Pool } = require('pg'); // Importar el cliente de PostgreSQL
require('dotenv').config(); // Para cargar las variables de entorno

const app = express();
const router = require('./router');

// Configuración del pool de PostgreSQL
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

// Configuración de middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de sesiones para producción
app.use(
    session({
        store: new PgSession({
            pool: pool, // Usa PostgreSQL como almacenamiento de sesiones
        }),
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
