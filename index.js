



const jwt = require('jsonwebtoken');
const authRutas = require('./rutas/authRutas');
const Usuario = require('./models/Usuario');
//importacion de libs
const express = require('express');
const mongoose = require('mongoose');


require('dotenv').config();
const app = express();


// configuraciones de environment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
//manejo de JSON
app.use(express.json());

//CONEXION CON MONGODB\
mongoose.connect(MONGO_URI)
.then(() => {
        console.log('Conexion exitosa');
        app.listen(PORT, () => {console.log("Servidor express corriendo en el puerto: "+PORT)})
    }
).catch( error => console.log('error de conexion', error));



const autenticar = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ mensaje: 'error token de invalido' });
      }
      const decodificar = jwt.verify(token, 'clave_secreta');
      req.usuario = await Usuario.findById(decodificar.usuarioId);
      if (!req.usuario) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado' });
      }
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



 





// ruta
const notasRutas = require('./rutas/notasRutas');
const categoriasRutas = require('./rutas/categoriasRutas');
const recordatorioRutas = require('./rutas/recordatorioRutas');

app.use('/auth', authRutas);
app.use('/agenda', autenticar,notasRutas);
app.use('/agenda', autenticar,categoriasRutas);
app.use('/agenda', autenticar,recordatorioRutas);































