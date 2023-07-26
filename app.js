const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routes = require("./routes");
const sequelize = require("./config/database");

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use("/api", routes);

const createSwaggerDocs = require('./swagger');
createSwaggerDocs(app);



// Gestionnaire d'erreurs (middleware global pour les erreurs asynchrones)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);

  // Synchroniser les modèles avec la base de données
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
});

module.exports = app;