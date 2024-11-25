// Se importa el módulo para controlar el acceso mediante tokens
const jwt = require('jsonwebtoken');

// Se importa el módulo para cifrar las contraseñas
const bcrypt = require('bcrypt');

// Uso dotenv para las variables de entorno
require("dotenv").config({ path: "../../.env" });

// Se importan las funciones para obtener y/o agregar usuarios a la BD
const { crearUsuario, encontrarUsuarioPorEmail } = require('../models/usuarioModel');

// Función manejadora para el registro de usuarios
const registrar = async (req, res) => {
    const { nombre, email, contrasenia, rol } = req.body;

    try {
        console.log('Iniciando proceso de registro...'); // LOG INICIAL
        console.log('Datos recibidos:', { nombre, email, rol }); // LOG DE DATOS RECIBIDOS

        const hash = await bcrypt.hash(contrasenia, 10);
        console.log('Contraseña encriptada correctamente'); // LOG DE CONTRASEÑA ENCRIPTADA

        const nuevoUsuario = await crearUsuario(nombre, email, hash, rol);
        console.log('Usuario creado exitosamente:', nuevoUsuario); // LOG DE USUARIO CREADO

        res.status(201).json({ usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar el usuario:', error.message); // LOG DE ERROR DETALLADO
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

// Función manejadora para el inicio de sesión
const login = async (req, res) => {
    const { email, contrasenia } = req.body;

    try {
        console.log('Iniciando proceso de login...'); // LOG INICIAL
        console.log('Email recibido:', email); // LOG DE EMAIL RECIBIDO

        const usuario = await encontrarUsuarioPorEmail(email);
        if (!usuario) {
            console.log('Usuario no encontrado:', email); // LOG DE USUARIO NO ENCONTRADO
            return res.status(400).json({ error: 'Usuario no encontrado.' });
        }

        const esValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!esValida) {
            console.log('Contraseña incorrecta para el usuario:', email); // LOG DE CONTRASEÑA INCORRECTA
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generado para el usuario:', email); // LOG DE TOKEN GENERADO

        res.json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message); // LOG DE ERROR DETALLADO
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

module.exports = { registrar, login };
