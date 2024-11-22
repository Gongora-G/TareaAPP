require('dotenv').config(); // Cargar variables de entorno desde .env
const { Pool } = require('pg'); // Importar el cliente de PostgreSQL

// Configuración de la conexión
const pool = new Pool({
    host: process.env.PGHOST || 'localhost',         // Host de la base de datos
    user: process.env.PGUSER || 'postgres',          // Usuario
    password: process.env.PGPASSWORD || 'password',  // Contraseña
    database: process.env.PGDATABASE || 'testdb',    // Nombre de la base de datos
    port: process.env.PGPORT || 5432,                // Puerto
    ssl: process.env.PGSSL === 'true',               // Usar SSL si se requiere (opcional)
});

// Probar la conexión
pool.connect((error, client, release) => {
    if (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
    } else {
        console.log('✅ Conectado a la base de datos PostgreSQL');
        release(); // Libera el cliente después de la prueba
    }
});

module.exports = pool; // Exportar el pool para su uso en otros archivos
