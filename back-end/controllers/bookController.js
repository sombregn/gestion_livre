const Book = require('../models/Book');

// @desc    Obtenir tous les livres
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir un livre spécifique
// @route   GET /api/books/:id
// @access  Public
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Livre non trouvé' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Créer un nouveau livre
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res) => {
  try {
    // Ajouter l'utilisateur au corps de la requête
    req.body.user = req.user.id;

    const book = await Book.create(req.body);

    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mettre à jour un livre
// @route   PUT /api/books/:id
// @access  Private
exports.updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Livre non trouvé' });
    }

    // S'assurer que l'utilisateur est le propriétaire du livre
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé à mettre à jour ce livre',
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Supprimer un livre
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Livre non trouvé' });
    }

    // S'assurer que l'utilisateur est le propriétaire du livre
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé à supprimer ce livre',
      });
    }

    await book.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};