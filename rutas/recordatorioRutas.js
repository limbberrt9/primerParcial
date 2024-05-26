//RUTAS recordatorio.js

const express = require('express');
const rutas = express.Router();
const NotasModel = require('../models/Notas');
const categoriasModel = require('../models/Categorias');
const RecordatorioModel = require('../models/Recordatorio');
const recordatorioModel = require('../models/Recordatorio');

//END POINT TRAER TODO
rutas.get('/traerRecordatorio', async (req, res) => {
    try  {
        const recordatorio = await RecordatorioModel.find();
        res.json(recordatorio);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//END POINT  CREAR
rutas.post('/crearRecordatorio', async (req, res) => {
    const recordatorio = new RecordatorioModel({
        fecha:req.body.fecha,
        estado: req.body.estado,
        notas: req.body.notas
    })
    try {
        const nuevaRecordatorio= await recordatorio.save();
        res.status(201).json(nuevaRecordatorio);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});





// //END POINT EDITAR
// rutas.put('/editarCategorias/:id', async (req, res) => {
//     try {
//         const categoriasEditada = await categoriasModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
//         if (!categoriasEditada)
//             return res.status(404).json({ mensaje : 'categorias no encontrada!!!'});
//         else
//            return res.status(201).json(categoriasEditada);

//     } catch (error) {
//         res.status(400).json({ mensaje :  error.message})
//     }
// });


// //ENDPOINT ELIMINAR
// rutas.delete('/eliminarCategorias/:id',async (req, res) => {
//     try {
//        const categoriasEliminada = await categoriasModel.findByIdAndDelete(req.params.id);
//        if (!categoriasEliminada)
//             return res.status(404).json({ mensaje : 'Categoria no encontrada!!!'});
//        else 
//             return res.json({mensaje :  'Categoria eliminada'});    
//        } 
//     catch (error) {
//         res.status(500).json({ mensaje :  error.message})
//     }
// });


// // Obtener todas las notas de una categoría específica
// rutas.get('/notasPorCategoria/:idCategoria', async (req, res) => {
//     try {
//         const idCategoria = req.params.idCategoria;

//         // Encuentra la categoría específica por su ID
//         const categorias = await CategoriaModel.findById(idCategoria);
//         if (!categorias) {
//             return res.status(404).json({ mensaje: 'Categoría no encontrada' });
//         }
//         console.log(categorias);

//         // Obtén todas las notas asociadas con la categoría encontrada
//         const notas = await NotaModel.find({ categorias: categorias._id });
//         console.log(notas);
//         // Devuelve las notas encontradas
//         res.json(notas);
//         console.log(notas);
//     } catch (error) {
//         res.status(500).json({ mensaje: error.message });
//     }
// });


// rutas.get('/recordatoriosPorTituloNota/:tituloNota', async (req, res) => {
//     try {
//         const tituloNota = req.params.tituloNota;

//         const nota = await NotasModel.findOne({ titulo: tituloNota });

//         if (!nota) {
//             return res.status(404).json({ mensaje: 'Nota no encontrada' });
//         }

//         const recordatorios = await RecordatorioModel.find({ notas: nota._id });

//         res.json(recordatorios);
//     } catch (error) {
//         res.status(500).json({ mensaje: error.message });
//     }
// });




















// rutas.get('/recordatoriosPorTituloNota/:tituloNota', async (req, res) => {
//     try {
//         const tituloNota = req.params.tituloNota;

//         // Buscar la nota por título y popula los recordatorios
//         const nota = await NotasModel.findOne({ titulo: tituloNota }).populate('recordatorios');

//         if (!nota) {
//             return res.status(404).json({ mensaje: 'Nota no encontrada' });
//         }

//         // Estructurar la respuesta con el formato deseado
//         const respuesta = {
//             idNota: nota._id,
//             Titulo: nota.titulo,
//             Descripcion: nota.descripcion,
//             Recordatorios: nota.recordatorios ? nota.recordatorios.map(recordatorio => ({
//                 idRecordatorio: recordatorio._id,
//                 descripcion: recordatorio.descripcion,
//                 fechaRecordatorio: recordatorio.fecha,
//                 idNota: nota._id
//             })) : [] // Usar un arreglo vacío si nota.recordatorios es undefined
//         };

//         res.json([respuesta]); // Envolvemos la respuesta en un arreglo como se solicita
//     } catch (error) {
//         res.status(500).json({ mensaje: error.message });
//     }
// });

// rutas.get('/recordatoriosPorTituloNota/:tituloNota', async (req, res) => {
//     try {
//         const tituloNota = req.params.tituloNota;

//         // Paso 1: Buscar la nota por su título
//         const nota = await NotasModel.findOne({ titulo: tituloNota });

//         // Paso 2: Verificar si se encontró la nota
//         if (nota) {
//             // Paso 3: Utilizar el ID de la nota para buscar los recordatorios asociados
//             const recordatorios = await RecordatorioModel.find({ notas: nota._id });

//             // Mostrar los recordatorios encontrados
//             res.json(recordatorios);
//         } else {
//             res.status(404).json({ mensaje: 'Nota no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ mensaje: error.message });
//     }
// });


rutas.get('/recordatoriosPorTituloNota/:tituloNota', async (req, res) => {
    try {
        const tituloNota = req.params.tituloNota;

        // Paso 1: Buscar la nota por su título
        const nota = await NotasModel.findOne({ titulo: tituloNota });

        // Paso 2: Verificar si se encontró la nota
        if (nota) {
            // Paso 3: Utilizar el ID de la nota para buscar los recordatorios asociados
            const recordatorios = await RecordatorioModel.find({ notas: nota._id });

            // Estructurar la respuesta con los campos adicionales de la nota y los recordatorios
            const respuesta = {
                idNota: nota._id,
                Titulo: nota.titulo,
                Descripcion: nota.descripcion,
                fechaCreacion: nota.fechaCreacion,
                fechaModificacion: nota.fechaModificacion,
                idUsuario: nota.idUsuario,
                recordatorios: recordatorios.map(recordatorio => ({
                    idRecordatorio: recordatorio._id,
                    fecha: recordatorio.fecha,
                    estado: recordatorio.estado
                }))
            };

            res.json(respuesta);
        } else {
            res.status(404).json({ mensaje: 'Nota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});






















//exportar rutas 
module.exports = rutas;