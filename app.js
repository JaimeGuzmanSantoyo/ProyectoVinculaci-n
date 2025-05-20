const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/views')); // para archivos estáticos
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// Credenciales para DB, aquí idealmente usa variables de entorno (más abajo te explico)
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'profesores',
    port: process.env.DB_PORT || '3306'
});

// Conexion a la DB
db.connect(err => {
    if (err) {
        console.log(`Error al conectar a la base de datos: ${err}`);
    } else {
        console.log(`Conexión a la base de datos exitosa`);
    }
});

// Puerto dinámico para Railway, o 3038 para local
const port = process.env.PORT || 3038;

// No necesitas pasar hostname, para que escuche en todas las interfaces
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

const path = require('path');

app.get('/unam.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'unam.jpg'));
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/rename', (req, res) => {
    res.render('rename');
});

app.get('/rename', (req, res) => {
    res.render('rename');
});

app.post('/edit', (req, res) => {
    res.render('edit');
});

app.get('/login_admin', (req, res) => {
    res.render('login_admin');
});

app.get('/grafica', (req, res) => {
    res.render('grafica');
});
