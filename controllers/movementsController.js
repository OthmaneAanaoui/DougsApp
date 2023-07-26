const { Op } = require('sequelize');
const { Movement, Balance } = require('../models');

// Contrôleur pour ajouter une opération
exports.addOperation = async (req, res, next) => {
  try {
    const { date, wording, amount } = req.body;

    // Créer l'opération dans la base de données
    const operation = await Movement.create({ date, wording, amount });

    res.status(201).json({ message: 'Opération ajoutée avec succès', operation });
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour récupérer toutes les opérations
exports.getAllOperations = async (req, res, next) => {
  try {
    // Récupérer toutes les opérations de la base de données
    const operations = await Movement.findAll();

    res.status(200).json({ operations });
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour ajouter un point de contrôle (balance)
exports.addBalance = async (req, res, next) => {
  try {
    const { date, balance } = req.body;

    // Créer le point de contrôle dans la base de données
    const newBalance = await Balance.create({ date, balance });

    res.status(201).json({ message: 'Point de contrôle ajouté avec succès', balance: newBalance });
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour récupérer tous les points de contrôle (balances)
exports.getAllBalances = async (req, res, next) => {
  try {
    // Récupérer tous les points de contrôle de la base de données
    const balances = await Balance.findAll();

    res.status(200).json({ balances });
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour valider l'intégrité des mouvements
exports.validateMovements = async (req, res, next) => {
  try {
    // Récupérer toutes les opérations et tous les points de contrôle de la base de données
    const operations = await Movement.findAll();
    const balances = await Balance.findAll();

    // Votre logique de validation va ici...

    res.status(200).json({ message: 'Validation complétée avec succès' });
  } catch (error) {
    next(error);
  }
};
