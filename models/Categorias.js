//MODELO Categorias.js
//importar la libreria
const mongoose = require('mongoose');
//definir el esquema
const categoriasSchema = new mongoose.Schema({
    numeroCategorias: Number,
    nombreCategorias: { type: String, require: true },
    descripcion: String,

});

//crear un modelo
const categoriasModel = mongoose.model('Categorias', categoriasSchema, 'categorias');
module.exports = categoriasModel;