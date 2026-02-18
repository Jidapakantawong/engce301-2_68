const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

// GET /api/books
router.get('/', BookController.getAllBooks);

// GET /api/books/:id
router.get('/:id', BookController.getBookById);

// GET /api/books/search?q=
router.get('/search', BookController.searchBooks);

// POST /api/books
router.post('/', BookController.createBook);

// PUT /api/books/:id
router.put('/:id', BookController.updateBook);

module.exports = router;