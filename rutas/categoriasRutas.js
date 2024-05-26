//RUTAS categoriasRutas.js
const express = require('express');
const rutas = express.Router();


const router = express.Router();  /******/
const CategoriaModel = require('../models/Categorias');
const NotaModel = require('../models/Notas');



const categoriasModel = require('../models/Categorias');

//END POINT TRAER TODO
rutas.get('/traerCategorias', async (req, res) => {
    try  {
        const categorias = await  categoriasModel.find();
        res.json(categorias);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//END POINT  CREAR
rutas.post('/crearCategorias', async (req, res) => {
    const categorias = new categoriasModel({
        numeroCategorias:req.body.numeroCategorias,
        nombreCategorias: req.body.nombreCategorias,
        descripcion: req.body.descripcion
    })
    try {
        const nuevaCategorias = await categorias.save();
        res.status(201).json(nuevaCategorias);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});



//END POINT EDITAR
rutas.put('/editarCategorias/:id', async (req, res) => {
    try {
        const categoriasEditada = await categoriasModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!categoriasEditada)
            return res.status(404).json({ mensaje : 'categorias no encontrada!!!'});
        else
           return res.status(201).json(categoriasEditada);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});


//ENDPOINT ELIMINAR
rutas.delete('/eliminarCategorias/:id',async (req, res) => {
    try {
       const categoriasEliminada = await categoriasModel.findByIdAndDelete(req.params.id);
       if (!categoriasEliminada)
            return res.status(404).json({ mensaje : 'Categoria no encontrada!!!'});
       else 
            return res.json({mensaje :  'Categoria eliminada'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});











//exportar rutas 
module.exports = rutas;