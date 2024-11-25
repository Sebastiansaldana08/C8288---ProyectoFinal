const pool = require('../config/dbConfig');

// Crear recurso - Solo Administradores y Operadores
exports.crearRecurso = async (req, res) => {
    const { tipo_recurso, configuracion, estado } = req.body;
    const id_usuario = req.usuario.id; // Usuario autenticado que crea el recurso

    try {
        const resultado = await pool.query(
            'INSERT INTO recursos (tipo_recurso, configuracion, estado, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
            [tipo_recurso, configuracion, estado, id_usuario]
        );
        res.status(201).json({ recurso: resultado.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el recurso.' });
    }
};

// Obtener recursos - Cualquier usuario autenticado
exports.obtenerRecursos = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM recursos');
        res.status(200).json({ recursos: resultado.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los recursos.' });
    }
};

// Actualizar recurso - Solo Administradores
exports.actualizarRecurso = async (req, res) => {
    const { id } = req.params;
    const { tipo_recurso, configuracion, estado } = req.body;

    try {
        const resultado = await pool.query(
            'UPDATE recursos SET tipo_recurso = $1, configuracion = $2, estado = $3 WHERE id = $4 RETURNING *',
            [tipo_recurso, configuracion, estado, id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Recurso no encontrado.' });
        }

        res.status(200).json({ recurso: resultado.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el recurso.' });
    }
};

// Eliminar recurso - Solo Administradores
exports.eliminarRecurso = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'DELETE FROM recursos WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Recurso no encontrado.' });
        }

        res.status(200).json({ message: 'Recurso eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el recurso.' });
    }
};
