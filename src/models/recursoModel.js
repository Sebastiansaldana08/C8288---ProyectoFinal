const pool = require('../config/dbConfig');

// Crear un recurso
const crearRecurso = async (tipo_recurso, configuracion, estado, id_usuario) => {
    const resultado = await pool.query(
        'INSERT INTO recursos (tipo_recurso, configuracion, estado, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
        [tipo_recurso, configuracion, estado, id_usuario]
    );
    return resultado.rows[0];
};

// Obtener todos los recursos
const obtenerRecursos = async () => {
    const resultado = await pool.query('SELECT * FROM recursos');
    return resultado.rows;
};

// Obtener un recurso por ID
const obtenerRecursoPorId = async (id) => {
    const resultado = await pool.query('SELECT * FROM recursos WHERE id = $1', [id]);
    return resultado.rows[0];
};

// Actualizar un recurso por ID
const actualizarRecurso = async (id, tipo_recurso, configuracion, estado) => {
    const resultado = await pool.query(
        'UPDATE recursos SET tipo_recurso = $1, configuracion = $2, estado = $3 WHERE id = $4 RETURNING *',
        [tipo_recurso, configuracion, estado, id]
    );
    return resultado.rows[0];
};

// Eliminar un recurso por ID
const eliminarRecurso = async (id) => {
    const resultado = await pool.query(
        'DELETE FROM recursos WHERE id = $1 RETURNING *',
        [id]
    );
    return resultado.rows[0];
};

// Exportar las funciones del modelo
module.exports = {
    crearRecurso,
    obtenerRecursos,
    obtenerRecursoPorId,
    actualizarRecurso,
    eliminarRecurso,
};
