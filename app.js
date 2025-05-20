const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

/*instanciar*/ 
const app = express();
app.use(express.static(__dirname + '/views')); // nos va servir para poder cargar  archivos estáticos desde la carpeta 'views'
app.use(bodyParser.urlencoded({extended: false}));


app.set('view engine', 'ejs');

//creedenciales para DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'profesores',
    port: '3306'
});

//conexion a la DB
db.connect(err=>{
    if(err){
        console.log(`Error al momento de hacer conexion BB :3 ${err}`);
    }else{
        console.log(`Conexion realizada :3`);
    }
});
/*Puerto*/
const port = 3038; 
const hostName= 'localhost';
//server inicio
app.listen(port,hostName,()=>{
    console.log(`El server esta en escucha desde http://${hostName}:${port}`);



});
const path = require('path');



app.get('/unam.jpg', (req, res) => {
    res.sendFile(__dirname + '/views/unam.jpg');
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


//editar usuario
app.post('/edit', (req, res) => {
  res.render('edit'); 
});

//Ir a login de administrador
 app.get('/login_admin',(req, res)=>{
  res.render('login_admin');
 })

 app.get('/grafica', (req, res) => {
  res.render('grafica'); 
});


