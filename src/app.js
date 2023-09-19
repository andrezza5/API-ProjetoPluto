require("./config/dotenv");
require("express-async-errors");

const express = require("express");
const { initDatabase } = require("./config/db");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger/swaggerDef');

const planosRoute = require("./routes/planosRoute");
const unidadeRoute = require("./routes/unidadeRoute");
const authRoute = require("./routes/authRoute");
const { stack } = require("./routes/planosRoute");

const app = express();

const port = process.env.APP_PORT || 5000;

app.get("/", (req, res) => {
    res.send("Seja bem vindo à API do projeto Pluto!");
});

app.use(cors());

app.use(express.json());

app.use('/api-docs-pluto', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/planos", planosRoute);
app.use("/api/unidade", unidadeRoute);
app.use("/api/auth", authRoute);


initDatabase();

app.use((err, req, res, next) => {
    console.error(err, stack);
    res.status(500).send({ 'Erro': err.message})
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);  
});