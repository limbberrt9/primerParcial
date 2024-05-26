//MODELO Notas.js
//importar la libreria
const mongoose = require('mongoose');
//definir el esquema
const notasSchema = new mongoose.Schema({
    numeroNota:Number,
    titulo:{type : String , require:true},
    autor:String,
    descripcion: String,
    fecha:String,
    categorias: { type: mongoose.Schema.Types.ObjectId, ref:'categorias' },
});

    //crear un modelo
                                       //nombre receta , esquema , nombre de la coleccion en MDB 
    const notasModel = mongoose.model('Notas',notasSchema, 'notas');
    module.exports = notasModel;


