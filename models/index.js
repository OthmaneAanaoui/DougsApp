const Movement = require("./movement");
const User = require("./user");
const sequelize = require("../config/database");

// Définir les associations entre les modèles si nécessaire
// ...

// Synchroniser les modèles avec la base de données
(async () => {
  try {
    await sequelize.sync();
    console.log(
      "Synchronisation des modèles avec la base de données terminée."
    );
  } catch (error) {
    console.error(
      "Erreur lors de la synchronisation des modèles avec la base de données:",
      error
    );
  }
})();

module.exports = {
  Movement,
  User,
};
