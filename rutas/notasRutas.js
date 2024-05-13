const express = require('express');
const rutas = express.Router();
const notasModel = require('../models/Notas');

//END POINT TRAER TODO
rutas.get('/traerNotas', async (req, res) => {
    try  {
        const notas = await  notasModel.find();
        res.json(notas);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//END POINT  CREAR
rutas.post('/crear', async (req, res) => {
    const notas = new notasModel({
        numeroNota:req.body.numeroNota,
        titulo: req.body.titulo,
        autor: req.body.autor,
        descripcion: req.body.descripcion,
        fecha:req.body.fecha
    })
    try {
        const nuevaNotas = await notas.save();
        res.status(201).json(nuevaNotas);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});


//END POINT EDITAR
rutas.put('/editar/:id', async (req, res) => {
    try {
        const notaEditada = await notasModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!notaEditada)
            return res.status(404).json({ mensaje : 'Receta no encontrada!!!'});
        else
           return res.status(201).json(notaEditada);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});


//ENDPOINT ELIMINAR
rutas.delete('/eliminar/:id',async (req, res) => {
    try {
       const notaEliminada = await notasModel.findByIdAndDelete(req.params.id);
       if (!notaEliminada)
            return res.status(404).json({ mensaje : 'Receta no encontrada!!!'});
       else 
            return res.json({mensaje :  'Nota eliminada'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});





//END POINT ENCONTRAR POR NUMERO DE NOTA
rutas.get('/notaPorNumero/:numeroNota', async (req, res) => {
    try {
        const nota = await notasModel.findOne({numeroNota: req.params.numeroNota});
        if (!nota)
            return res.status(404).json({ mensaje : 'Nota no encontrada!!!'});
        else 
            return res.json(nota);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//END POINT BUSCAR POR PALABRA CLAVE EN DESCRIPCION
rutas.get('/notasPorPalabraClave/:palabra', async (req, res) => {
    try {
        const notas = await notasModel.find({ descripcion: { $regex: req.params.palabra, $options: 'i' } });
        return res.json(notas);
        console.log(notas);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//END BUSCAR POR 3 CAMPOS 
rutas.get('/buscarNotas', async (req, res) => {
    try {
        const { titulo, descripcion, autor } = req.query;

        let condiciones = {};

        if (titulo) {
            condiciones.titulo = { $regex: new RegExp(titulo, 'i') };
        }

        if (descripcion) {
            condiciones.descripcion = { $regex: new RegExp(descripcion, 'i') };
        }

        if (autor) {
            condiciones.autor = { $regex: new RegExp(autor, 'i') };
        }

        const notas = await notasModel.find(condiciones);

        res.json(notas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


//BUSCAR POR FECHA ANTES DE:
rutas.get('/notasAntesDe/:fecha', async (req, res) => {
    try {
        const { fecha } = req.params;

        // Busca todas las notas con fecha anterior a la especificada
        const notasAntesDe = await notasModel.find({
            fecha: { $lt: fecha } 
        });

        res.json(notasAntesDe);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});



//END POINT ACTUALIZAR UNA PALABRA DE DESCRIPCION
rutas.patch('/actualizarPalabra/:id', async (req, res) => {
    const { palabraAntigua, palabraNueva } = req.body;
    try {
        const nota = await notasModel.findById(req.params.id);
        if (!nota) {
            return res.status(404).json({ mensaje: 'Nota no encontrada' });
        }

        // Reemplazar la palabra en la descripción
        nota.descripcion = nota.descripcion.replace(new RegExp(palabraAntigua, 'gi'), palabraNueva);

        const notaActualizada = await nota.save();
        res.status(200).json(notaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


//ORDENAR DE FORMA DESCENDENTE POR TITULO
rutas.get('/notasOrdenadasDesc', async (req, res) => {
    try {
        const notasOrdenadas = await notasModel.find().sort({ titulo: -1 });
        res.status(200).json(notasOrdenadas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

//exportar rutas 
module.exports = rutas;




 