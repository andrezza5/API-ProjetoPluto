const experienciasRepository = require("../repositories/experienciasRepository");

exports.getAllExperiencias = async (req, res) => {   
    const tipo = req.query.tipo;
    const experiencias = await experienciasRepository.getAllExperiencias(tipo); 
    res.json(experiencias);

 };

 exports.getExperienciaById = async (req, res) => {   
    const id = parseInt(req.params.id);
    const experiencias = await experienciasRepository.getExperienciaById(id); 
    res.json(experiencias);

 };

 exports.createExperiencia = async (req, res) => {   
   const experiencias = req.body;
   const newExperiencias = await experienciasRepository.createExperiencia(experiencias); 
   res.json(newExperiencias);

};

exports.updateExperiencia = async (req, res) => {   
   const id = parseInt(req.params.id)
   const experiencias = req.body;
   const updateExperiencias = await experienciasRepository.updateExperiencia(id, experiencias); 
   res.json(updateExperiencias);

};

exports.deleteExperiencia = async (req, res) => {   
   const id = parseInt(req.params.id)
   await experienciasRepository.deleteExperiencia(id); 
   res.json({message: `Experiencias ${id} deleted`});

};