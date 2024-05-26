//MODELO Recordatorios.js
//importar la libreria
const mongoose = require('mongoose');
//definir el esquema
const recordatorioSchema = new mongoose.Schema({
    fecha: String,
    estado: String,
    notas: { type: mongoose.Schema.Types.ObjectId, ref:'notas' }
});

//crear un modelo
const recordatorioModel = mongoose.model('Recordatorio', recordatorioSchema, 'recordatorio');
module.exports = recordatorioModel;

