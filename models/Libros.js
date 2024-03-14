var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//definimos el esquema de la libreria
const libroSchema = new Schema({
    titulo: String,
    autor: String,
    year: Number,
});

//Definimos el modelo del libro
const Libro = mongoose.model('Libro', libroSchema);
module.exports = Libro;

