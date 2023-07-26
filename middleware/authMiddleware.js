const jwt = require("jsonwebtoken");

// Middleware d'authentification pour vérifier si l'utilisateur est authentifié
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  const token = authHeader.split(" ")[1];

  // Vérifier le token JWT avec la clé secrète JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Token invalide" });
    }

    // Ajouter l'ID de l'utilisateur dans l'objet de requête pour une utilisation ultérieure
    req.userId = decodedToken.userId;
    next();
  });
};
