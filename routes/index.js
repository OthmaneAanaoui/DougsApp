const express = require("express");
const router = express.Router();
const movementsController = require("../controllers/movementsController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes publiques (non protégées par l'authentification)
router.post("/register", authController.register); // Route pour l'enregistrement d'un nouvel utilisateur
router.post("/login", authController.login); // Route pour la connexion d'un utilisateur existant

// Routes protégées par le middleware d'authentification
// Routes pour les opérations bancaires
router.post('/operations', authMiddleware, movementsController.addOperation); // Route pour ajouter une opération bancaire
router.get('/operations', authMiddleware, movementsController.getAllOperations); // Route pour obtenir toutes les opérations bancaires

// Routes pour les points de contrôle (balances)
router.post('/balances', authMiddleware, movementsController.addBalance); // Route pour ajouter un point de contrôle (balance)
router.get('/balances', authMiddleware, movementsController.getAllBalances); // Route pour obtenir tous les points de contrôle (balances)

// Route pour valider l'intégrité des mouvements bancaires
router.post('/movements/validation', authMiddleware, movementsController.validateMovements);

module.exports = router;
