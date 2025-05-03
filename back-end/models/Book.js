const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Veuillez fournir un titre'],
    trim: true,
    maxlength: [500, 'Le titre ne peut pas dépasser 100 caractères'],
  },
  author: {
    type: String,
    required: [true, 'Veuillez fournir un auteur'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Veuillez fournir une description'],
  },
  isbn: {
    type: String,
    required: [true, 'Veuillez fournir un ISBN'],
    unique: true,
    match: [
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
      'Veuillez fournir un ISBN valide',
    ],
  },
  publishedYear: {
    type: Number,
    required: [true, 'Veuillez fournir une année de publication'],
  },
  genre: {
    type: String,
    required: [true, 'Veuillez fournir un genre'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);