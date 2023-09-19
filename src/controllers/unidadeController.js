const unidadeRepository = require("../repositories/unidadeRepository");

/**
 * @swagger
 * /api/unidade:
 *   get:
 *     summary: Retorna todas as unidade
 *     description: Retorna todas as unidads e se não houver, a resposta será um array vazio.
 */

exports.getUnidade = async (req, res) => {   
    const unidade = await unidadeRepository.getUnidade(); 
    res.json(unidade);

 };

 /**
 * @swagger
 * /api/unidade/{id}:
 *   get:
 *     summary: Retorna unidade pelo seu id
 *     description: Retorna uma unidade pelo seu id e se não houver unidade, a resposta será um array vazio.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da unidade a ser retornado
 *         schema:
 *           type: integer
 *     responses:
 *       '404':
 *         description: Unidade não encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: Unidade não encontrada
 */

 exports.getUnidadeById = async (req, res) => {   
    const id = parseInt(req.params.id);
    const unidade = await unidadeRepository.getUnidadeById(id); 
    if (!unidade) {
      res.status(404).json({ error: 'Unidade não encontrada!' });
    } else {
      res.json(unidade);
    }
  }; 

 /**
 * @swagger
 * /api/unidade:
 *   post:
 *     summary: Cria uma nova unidade
 *     description: Cria uma unidade com base nos dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeunidade:
 *                 type: string
 *                 description: Nome da unidade
 *               endereco:
 *                 type: string
 *                 description: Endereco da unidade
 *               cidade_estado:
 *                 type: string
 *                 description: Cidade e Estado da unidade
 *               responsavel:
 *                 type: string
 *                 description: Responsavel pela unidade
 *               email:
 *                 type: string
 *                 description: Email da unidade
 *               cortitulo:
 *                 type: string
 *                 description: Cor do titulo
 *               corcorpotexto:
 *                 type: string
 *                 description: Cor do corpo do texto
 *     responses:
 *       201:
 *         description: Unidade criada com sucesso
 */

 exports.createUnidade = async (req, res) => {   
   const unidade = req.body;
   const newUnidade = await unidadeRepository.createUnidade(unidade); 
   if (newUnidade) {
      res.status(201).json({
        message: 'Unidade criada com sucesso!',
        plano: newUnidade
      });
    } else {
      res.status(500).json({ error: 'Falha ao criar o unidade.' });
    }
 };

 /**
 * @swagger
 * /api/unidade/{id}:
 *   put:
 *     summary: Atualiza uma nova unidade
 *     description: Atualiza uma unidade com base no Id fornecido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeunidade:
 *                 type: string
 *                 description: Nome da unidade
 *               endereco:
 *                 type: string
 *                 description: Endereco da unidade
 *               cidade_estado:
 *                 type: string
 *                 description: Cidade e Estado da unidade
 *               responsavel:
 *                 type: string
 *                 description: Responsavel pela unidade
 *               email:
 *                 type: string
 *                 description: Email da unidade
 *               cortitulo:
 *                 type: string
 *                 description: Cor do titulo
 *               corcorpotexto:
 *                 type: string
 *                 description: Cor do corpo do texto
  *     responses:
 *       '200':
 *         description: Unidade atualizada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Unidade atualizada com sucesso
 *       '404':
 *         description: Unidade não encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: Unidade não encontrada
 */

exports.updateUnidade = async (req, res) => {   
   const id = parseInt(req.params.id)
   const unidade = req.body;
   const updateUnidade = await unidadeRepository.updateUnidade(id, unidade); 
   if (!updateUnidade) {
      res.status(404).json({ error: 'Unidade não encontrada!' });
    } else {     
      res.json({ message: 'Unidade atualizada com sucesso!', unidade: updateUnidade });
    }
 };

/**
 * @swagger
 * /api/unidade/{id}:
 *   delete:
 *     summary: Deleta uma unidade pelo seu ID
 *     description: Deleta uma unidade pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da unidade a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Unidade excluída com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Unidade com ID {id} excluída com sucesso
 */


exports.deleteUnidade = async (req, res) => {   
   const id = parseInt(req.params.id)

   if (!await unidadeRepository.getUnidadeById(id)) {
      return res.status(404).json({ error: `Unidade com ID ${id} não encontrado` });
    }
    
    await unidadeRepository.deleteUnidade(id);
    return res.json({ message: `Unidade com ID ${id} excluída com sucesso` });
 };