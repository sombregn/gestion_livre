const express = require('express');
const { validateBook } = require('../middleware/validator');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

// const { protect, authorize } = require('../middleware/auth');
const { protect } = require('../middleware/auth');

router.post('/', protect, validateBook, createBook);  

router.route('/')
  .get(getBooks)

  router.route('/:id')
  .get(getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);


module.exports = router;