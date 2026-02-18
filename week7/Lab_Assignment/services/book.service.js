const BookDB = require('../database/books.db');

class BookService {

    static async getAllBooks() {
        return await BookDB.findAll();
    }

    static async getBookById(id) {
        const book = await BookDB.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    static async searchBooks(keyword) {
        return await BookDB.search(keyword);
    }

    static async createBook(bookData) {
        const { total_copies, available_copies } = bookData;

        if (total_copies < available_copies) {
            throw new Error('total_copies must be >= available_copies');
        }

        return await BookDB.create(bookData);
    }

    static async updateBook(id, bookData) {
        const book = await BookDB.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }

        if (bookData.total_copies < bookData.available_copies) {
            throw new Error('total_copies must be >= available_copies');
        }

        return await BookDB.update(id, bookData);
    }
}

module.exports = BookService;