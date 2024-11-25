const express = require('express');
const router = express.Router();
const recursoController = require('../controllers/recursoController');
const { autenticar, autorizar } = require('../middlewares/authMiddleware');

// Rutas para la gestión de recursos

// Crear recurso - solo Administradores y Operadores
router.post('/crear', autenticar, autorizar(['Administrador', 'Operador']), recursoController.crearRecurso);

// Obtener todos los recursos - cualquier usuario autenticado
router.get('/listar', autenticar, autorizar(), recursoController.obtenerRecursos);

// Actualizar recurso por ID - solo Administradores
router.put('/actualizar/:id', autenticar, autorizar(['Administrador']), recursoController.actualizarRecurso);

// Eliminar recurso por ID - solo Administradores
router.delete('/eliminar/:id', autenticar, autorizar(['Administrador']), recursoController.eliminarRecurso);

module.exports = router;
