const express = require("express");

const unidadeController = require("../controllers/unidadeController");

const router = express.Router();

router.get("/", unidadeController.getUnidade);
router.get("/:id", unidadeController.getUnidadeById);
router.post("/", unidadeController.createUnidade);
router.put("/:id", unidadeController.updateUnidade);
router.delete("/:id", unidadeController.deleteUnidade);

module.exports = router;