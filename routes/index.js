const express = require("express");
const router = express.Router();
const movementsController = require("../controllers/movementsController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes publiques
router.post("/register", authController.register);
router.post("/login", authController.login);

// Routes protégées par le middleware d'authentification
router.get("/movements", authMiddleware, movementsController.getAllMovements);
router.post("/movements", authMiddleware, movementsController.createMovement);

module.exports = router;
