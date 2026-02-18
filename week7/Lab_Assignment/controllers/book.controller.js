const BookService = require('../services/book.service');

class BookController {

    // GET /api/books
    static async getAllBooks(req, res, next) {
        try {
            const books = await BookService.getAllBooks();
            res.json({ success: true, data: books });
        } catch (err) {
            next(err);
        }
    }

    // GET /api/books/:id
    static async getBookById(req, res, next) {
        try {
            const book = await BookService.getBookById(req.params.id);
            res.json({ success: true, data: book });
        } catch (err) {
            res.status(404).json({ success: false, error: err.message });
        }
    }

    // GET /api/books/search?q=
    static async searchBooks(req, res, next) {
        try {
            const { q } = req.query;
            const books = await BookService.searchBooks(q || '');
            res.json({ success: true, data: books });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/books
    static async createBook(req, res, next) {
        try {
            const result = await BookService.createBook(req.body);
            res.status(201).json({
                success: true,
                message: 'Book created successfully',
                data: result
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // PUT /api/books/:id
    static async updateBook(req, res, next) {
        try {
            const result = await BookService.updateBook(req.params.id, req.body);
            res.json({
                success: true,
                message: 'Book updated successfully',
                data: result
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}

module.exports = BookController;