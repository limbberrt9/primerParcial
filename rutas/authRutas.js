//RUTAS authRutas.js

const express = require('express');
const rutas = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();







//Registro 
rutas.post('/registro', async (req, res) => {
    try {
        const { nombreusuario, correo, contrasenia } = req.body;
        const usuario = new Usuario({ nombreusuario, correo, contrasenia});
        await usuario.save();
        res.status(201).json({mensaje: 'Usuario registrado'});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});





rutas.post('/iniciarsesion', async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario)
            return res.status(401).json({ error : 'Correo invalido!!!!!'});
        const validarContrasena = await usuario.compararContrasenia(contrasenia);
        if (!validarContrasena)
            return res.status(401).json({ error : 'Contrasenia invalido!!!!!'});
        
        // Creación del token JWT
        const token = jwt.sign({ usuarioId: usuario._id },'clave_secreta', {expiresIn: '3h'});
        
        // Configuración de la cookie con el token JWT
        res.cookie('jwtToken', token, { httpOnly: true }); // httpOnly asegura que la cookie no sea accesible por JavaScript en el navegador

        // Envío de respuesta al cliente solo con el token JWT
        res.json( {token});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});









const redis = require('redis');
// Cerrar sesión
rutas.post('/logout', (req, res) => {
    try {
        res.clearCookie('jwtToken'); // Limpiar la cookie del token
        res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cerrar sesión', error: error.message });
    }
});

module.exports = rutas;
















