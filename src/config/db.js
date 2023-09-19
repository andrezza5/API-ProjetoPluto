const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === "production" ? true : false,
});

const initDatabase = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS planos (
            id SERIAL PRIMARY KEY,
            image VARCHAR(255) NOT NULL,
            titulocard VARCHAR(255) NOT NULL,
            cortitulo VARCHAR(255) NOT NULL,
            valorplano VARCHAR(255) NOT NULL,
            corbotao VARCHAR(255) NOT NULL,
            cortextobotao VARCHAR(255) NOT NULL,
            coriconebotao VARCHAR(255) NOT NULL            
        );
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS unidade (
            id SERIAL PRIMARY KEY,
            nomeunidade VARCHAR(255) NOT NULL,
            endereco VARCHAR(255) NOT NULL,
            cidade_estado VARCHAR(255) NOT NULL,
            responsavel VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            cortitulo VARCHAR(255) NOT NULL,
            corcorpotexto VARCHAR(255) NOT NULL
        );
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
        );             
        `);

  console.log("Banco de dados inicializado com sucesso!");
};

module.exports = { pool, initDatabase };
