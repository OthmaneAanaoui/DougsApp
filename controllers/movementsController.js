const { Movement } = require("../models");

exports.getAllMovements = async (req, res, next) => {
  try {
    const movements = await Movement.findAll();
    res.json(movements);
  } catch (error) {
    next(error);
  }
};

exports.createMovement = async (req, res, next) => {
  try {
    const { date, wording, amount } = req.body;
    const movement = await Movement.create({ date, wording, amount });
    res.status(201).json(movement);
  } catch (error) {
    next(error);
  }
};
