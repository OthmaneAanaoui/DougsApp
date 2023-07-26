# DougsApp


## Spécification des Besoins

- Récupérer les opérations bancaires de ses clients à partir des sites des banques en utilisant des prestataires externes.
- Assurer l'intégrité des données récupérées pour éviter les erreurs de synchronisation.
- Générer des rapports de synchronisation pour permettre aux comptables du cabinet de vérifier les opérations bancaires récupérées.

## Technologies Utilisées

Pour le développement de l'application, nous avons utilisé les technologies suivantes :

- Node.js : Une plateforme JavaScript côté serveur pour créer le backend de l'application.
- Express : Un framework Node.js pour créer des API et gérer les routes.
- MySQL : Une base de données relationnelle pour stocker les opérations bancaires et les points de contrôle.
- Sequelize : Un ORM (Object-Relational Mapping) pour communiquer avec la base de données MySQL en utilisant des objets JavaScript.
- dotenv : Un module Node.js pour charger les variables d'environnement à partir du fichier .env.
- bcrypt : Une bibliothèque pour hacher les mots de passe des utilisateurs.
- jsonwebtoken (JWT) : Une bibliothèque pour générer et vérifier les tokens d'authentification.
- Mocha et Chai : Des outils pour écrire et exécuter des tests unitaires.
- Swagger : Fichier JavaScript contenant la configuration pour Swagger UI, permettant de générer la documentation interactive de l'API.

## Structure du Projet

```
mon-app-express/
  |- app.js
  |- config/
      |- database.js
  |- controllers/
      |- movementsController.js
      |- authController.js
  |- middleware/
      |- authMiddleware.js
  |- models/
      |- index.js
      |- movement.js
      |- balance.js
      |- user.js
  |- routes/
      |- index.js
  |- test/
      |- auth.test.js
  |- .env
  |- package.json
  |- swagger.js
  |- swagger.yaml
  |- README.md
```

## Installation des Dépendances

Avant de démarrer l'application, assurez-vous d'avoir Node.js et MySQL installés sur votre machine.

1. Clonez le dépôt GitHub :

```
git clone https://github.com/OthmaneAanaoui/DougsApp.git
```

2. Installez les dépendances requises :

```
cd DougsApp
npm install
```

3. Configurez les variables d'environnement :

Configurez le fichier `.env` à la racine du projet et définissez les variables d'environnement comme indiqué dans l'exemple donné dans le rapport.

## Configuration de la Base de Données

Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine. Créez une base de données avec le nom spécifié dans la variable `DB_DATABASE` du fichier `.env`. Vérifiez également que les identifiants de connexion (nom d'utilisateur et mot de passe) sont corrects.

## Démarrer l'Application

Pour lancer l'application, exécutez la commande suivante :

```
npm start
```

L'application sera accessible à l'adresse http://localhost:3000.

## Tests

Pour exécuter les tests unitaires, utilisez la commande suivante :

```
npm test ou npx mocha
```

## Documentation de l'API (Swagger UI)

Vous pouvez accéder à la documentation interactive de l'API en ouvrant le fichier `swagger.yaml` dans un éditeur de texte ou en utilisant Swagger UI. Pour démarrer Swagger UI, utilisez la commande suivante :

```
npm run swagger-ui
```

Swagger UI sera accessible à l'adresse http://localhost:5000.

