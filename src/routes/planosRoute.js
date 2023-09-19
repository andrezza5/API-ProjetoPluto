const express = require("express");

const planosController = require("../controllers/planosController");

const router = express.Router();

router.get("/", planosController.getAllPlanos);
router.get("/:id", planosController.getPlanoById);
router.post("/", planosController.createPlano);
router.put("/:id", planosController.updatePlano);
router.delete("/:id", planosController.deletePlano);

module.exports = router;