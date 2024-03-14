//Incluimos mongoos y se abre una conexion
var mongoose = require('mongoose');
var MOONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/db_libreria';
mongoose.connect(MOONGO_URL);

//Mostramos la conexion
mongoose.connection.on('connected', function(){
    console.log('Conectado a la base de datos');
})

//Error de conexion
mongoose.connection.on('error', function(err){
    console.log('Error al conectar la base de datos: '+err);
})

//Cuando se encuentre desconectado
mongoose.connection.on('disconnected', function(){
    console.log('Desconectado de la base de datos');
})