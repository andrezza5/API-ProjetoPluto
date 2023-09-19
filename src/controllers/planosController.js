const planosRepository = require("../repositories/planosRepository");

/**
 * @swagger
 * /api/planos:
 *   get:
 *     summary: Retorna todos os planos
 *     description: Retorna todos os planos e se não houver planos, a resposta será um array vazio.
 *   
 */


exports.getAllPlanos = async (req, res) => {   
    const tipo = req.query.tipo;
    const planos = await planosRepository.getAllPlanos(tipo); 
    res.json(planos);

 };

/**
 * @swagger
 * /api/planos/{id}:
 *   get:
 *     summary: Retorna plano pelo seu id
 *     description: Retorna um plano pelo seu id e se não houver plano, a resposta será um array vazio.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do plano a ser retornado
 *         schema:
 *           type: integer
 *     responses:
 *       '404':
 *         description: Plano não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: Plano não encontrado
 */

 exports.getPlanoById = async (req, res) => {
   const id = parseInt(req.params.id);
   const planos = await planosRepository.getPlanosById(id);
 
   if (!planos) {
     res.status(404).json({ error: 'Plano não encontrado!' });
   } else {
     res.json(planos);
   }
 };

/**
 * @swagger
 * /api/planos:
 *   post:
 *     summary: Cria um novo plano
 *     description: Cria um plano com base nos dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL da imagem do plano
 *               titulocard:
 *                 type: string
 *                 description: Título do cartão do plano
 *               cortitulo:
 *                 type: string
 *                 description: Cor do título do plano
 *               valorplano:
 *                 type: number
 *                 description: Valor do plano
 *               corbotao:
 *                 type: string
 *                 description: Cor do botão
 *               cortextobotao:
 *                 type: string
 *                 description: Cor do texto do botão
 *               coriconebotao:
 *                 type: string
 *                 description: Cor do ícone do botão
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 */

 exports.createPlano = async (req, res) => {
   const planos = req.body;
   const newPlanos = await planosRepository.createPlano(planos);

   if (newPlanos) {
     res.status(201).json({
       message: 'Plano criado com sucesso!',
       plano: newPlanos
     });
   } else {
     res.status(500).json({ error: 'Falha ao criar o plano.' });
   }
};


/**
 * @swagger
 * /api/planos/{id}:
 *   put:
 *     summary: Atualiza o plano pelo seu ID
 *     description: Atualiza um plano existente pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do plano a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL da imagem do plano
 *               titulocard:
 *                 type: string
 *                 description: Título do cartão do plano
 *               cortitulo:
 *                 type: string
 *                 description: Cor do título do plano
 *               valorplano:
 *                 type: number
 *                 description: Valor do plano
 *               corbotao:
 *                 type: string
 *                 description: Cor do botão
 *               cortextobotao:
 *                 type: string
 *                 description: Cor do texto do botão
 *               coriconebotao:
 *                 type: string
 *                 description: Cor do ícone do botão
 *     responses:
 *       '200':
 *         description: Plano atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Plano atualizado com sucesso
 *       '404':
 *         description: Plano não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: Plano não encontrado
 */


 exports.updatePlano = async (req, res) => {   
   const id = parseInt(req.params.id)
   const planos = req.body;
   const updatePlanos = await planosRepository.updatePlano(id, planos); 

   if (!updatePlanos) {
      res.status(404).json({ error: 'Plano não encontrado!' });
    } else {     
      res.json({ message: 'Plano atualizado com sucesso!', plano: updatePlanos });
    }
 };


/**
 * @swagger
 * /api/planos/{id}:
 *   delete:
 *     summary: Deleta um plano pelo seu id
 *     description: Deleta um plano pelo seu id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do plano a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Plano excluído com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Plano com ID {id} excluído com sucesso
 */


 exports.deletePlano = async (req, res) => {
   const id = parseInt(req.params.id);
   
   if (!await planosRepository.getPlanosById(id)) {
     return res.status(404).json({ error: `Plano com ID ${id} não encontrado` });
   }
   
   await planosRepository.deletePlano(id);
   return res.json({ message: `Plano com ID ${id} excluído com sucesso` });
};

