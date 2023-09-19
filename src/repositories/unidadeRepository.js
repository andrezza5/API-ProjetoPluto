const { pool } = require("../config/db");

exports.getUnidade = async () => {
        const result = await pool.query("SELECT * FROM unidade");
       return result.rows;    
    }

exports.getUnidadeById = async (id) => {
        const result = await pool.query(`SELECT * FROM unidade WHERE id = $1`, [id]);
       return result.rows[0];    
    }

exports.createUnidade = async (unidade) => {
        const result = await pool.query(`
        INSERT INTO unidade (nomeunidade, endereco, cidade_estado, responsavel, email, cortitulo, corcorpotexto)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `, [unidade.nomeunidade, unidade.endereco, unidade.cidade_estado, unidade.responsavel, unidade.email, unidade.cortitulo, unidade.corcorpotexto]);
       return result.rows[0];    
    }

    exports.updateUnidade = async (id, unidade) => {
        const result = await pool.query(`
        UPDATE unidade 
        SET nomeunidade = $1, endereco = $2, cidade_estado = $3, responsavel = $4, email = $5, cortitulo = $6, corcorpotexto = $7
        WHERE id = $8
        RETURNING *
        `, [unidade.nomeunidade, unidade.endereco, unidade.cidade_estado, unidade.responsavel, unidade.email, unidade.cortitulo, unidade.corcorpotexto, id]);
       return result.rows[0];    
    }

    exports.deleteUnidade = async (id) => {
       await pool.query(`DELETE FROM unidade WHERE id = $1`, [id]);        
    }