# Application de Gestion de Bibliothèque

Une application web permettant aux utilisateurs de gérer leur collection de livres, avec authentification et opérations CRUD.

## Technologies utilisées

- **Backend**: Node.js, Express.js
- **Frontend**: React (Hooks et Context API)
- **Base de données**: MongoDB (NoSQL)
- **Authentification**: JWT (JSON Web Tokens)

## Fonctionnalités

- Inscription et authentification des utilisateurs
- CRUD (Create, Read, Update, Delete) pour les livres
- Interface utilisateur intuitive et responsive
- Protection des routes et des données utilisateur

## Installation et configuration

### Prérequis

- Node.js (v14+)
- npm
- MongoDB (local ou Atlas)

### Variables d'environnement

Créez un fichier `.env` a la racine du projet dans le  dossier comme suit gestion_livre/back-end/.env:

```
PORT=5000
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

### Installation

1. Clonez le dépôt:
```bash
git clone https://github.com/sombregn/gestion_livre
cd gestion_livre
```

2. Installez les dépendances pour le backend:
```bash
cd back-end
npm install
```

3. Installez les dépendances pour le frontend:
```bash
cd ../frontend
npm install
```

### Exécution de l'application

1. Démarrez le serveur backend:
```bash
cd back-end
npm run dev
```

2. Démarrez le client frontend (dans un nouveau terminal):
```bash
cd frontend
npm start
```

3. Accédez à l'application via votre navigateur à l'adresse: `http://localhost:3000`

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription d'un utilisateur
- `POST /api/auth/login` - Connexion d'un utilisateur
- `GET /api/auth/profile` - Obtenir le profil de l'utilisateur actuel (protégé)

### Livres

- `GET /api/books` - Récupérer tous les livres de l'utilisateur (protégé)
- `GET /api/books/:id` - Récupérer un livre spécifique (protégé)
- `POST /api/books` - Créer un nouveau livre (protégé)
- `PUT /api/books/:id` - Mettre à jour un livre (protégé)
- `DELETE /api/books/:id` - Supprimer un livre (protégé)

## Modèle de données

### Utilisateur
```
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Livre
```
{
  title: String (required),
  author: String (required),
  genre: String (required),
  publishedYear: Number,
  description: String,
  userId: ObjectId (reference to User),
  createdAt: Date
}
```

## Sécurité

- Les mots de passe sont hashés avec bcrypt avant d'être stockés
- Authentification par JWT pour les routes protégées
- Validation des données côté serveur
- Protection des routes et des ressources par utilisateur

## Futures améliorations possibles
- Fonction de recherche  côté fron-end
- Gestion des livres

