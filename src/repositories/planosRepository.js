const { pool } = require('../config/db');

exports.getAllPlanos = async (tipo) => {
    let query = 'SELECT * FROM planos';
    
    if (tipo) {
        query += ` WHERE tipo = '${tipo}'`;
    }

    const result = await pool.query(query);
    
    return result.rows;
}

exports.getPlanosById = async (id) => {
    const result = await pool.query('SELECT * FROM planos WHERE id = $1', [id]);
    return result.rows[0];
}

exports.createPlano = async (plano) => {
    const result = await pool.query(`
        INSERT INTO planos (image, titulocard, cortitulo, valorplano, corbotao, cortextobotao, coriconebotao)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `, [plano.image, plano.titulocard, plano.cortitulo, plano.valorplano, plano.corbotao, plano.cortextobotao, plano.coriconebotao]);
    return result.rows[0];
}

exports.updatePlano = async (id, plano) => {
    const result = await pool.query(`
        UPDATE planos
        SET image = $1, titulocard = $2, cortitulo = $3, valorplano = $4, corbotao = $5, cortextobotao = $6, coriconebotao = $7
        WHERE id = $8
        RETURNING *
    `, [plano.image, plano.titulocard, plano.cortitulo, plano.valorplano, plano.corbotao, plano.cortextobotao, plano.coriconebotao, id]);
    return result.rows[0];
}

exports.deletePlano = async (id) => {
   await pool.query('DELETE FROM planos WHERE id = $1', [id]);
}