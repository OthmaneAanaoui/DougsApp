const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Fonction pour générer le token JWT
const generateToken = (user) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Temps d'expiration du token (1 heure dans cet exemple)
  });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà enregistré" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la base de données
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Générer le token JWT
    const token = generateToken(user);

    res
      .status(201)
      .json({ message: "Utilisateur enregistré avec succès", token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Générer le token JWT
    const token = generateToken(user);

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    next(error);
  }
};
