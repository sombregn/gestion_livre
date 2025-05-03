const { validationResult, check } = require('express-validator');

// Middleware pour valider les résultats
exports.validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Validation pour l'inscription
exports.validateRegister = [
  check('name', 'Le nom est requis').not().isEmpty(),
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('password', 'Le mot de passe doit comporter au moins 6 caractères').isLength({ min: 6 }),
  exports.validateResults,
];

// Validation pour la connexion
exports.validateLogin = [
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('password', 'Le mot de passe est requis').exists(),
  exports.validateResults,
];

// Validation pour la création de livre
exports.validateBook = [
  check('title', 'Le titre est requis').not().isEmpty(),
  check('author', 'L\'auteur est requis').not().isEmpty(),
  check('description', 'La description est requise').not().isEmpty(),
  check('isbn', 'L\'ISBN est requis').not().isEmpty(),
  check('publishedYear', 'L\'année de publication est requise').isNumeric(),
  check('genre', 'Le genre est requis').not().isEmpty(),
  exports.validateResults,
];