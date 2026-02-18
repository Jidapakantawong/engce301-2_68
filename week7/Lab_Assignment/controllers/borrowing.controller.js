const BorrowingService = require('../services/borrowing.service');

class BorrowingController {

    // GET /api/borrowings
    static async getAllBorrowings(req, res, next) {
        try {
            const data = await BorrowingService.getOverdueBorrowings();
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }

    // GET /api/borrowings/:id
    static async getBorrowingById(req, res, next) {
        try {
            const data = await BorrowingService.getOverdueBorrowings(req.params.id);
            res.json({ success: true, data });
        } catch (err) {
            res.status(404).json({ success: false, error: err.message });
        }
    }

    // GET /api/borrowings/member/:memberId
    static async getBorrowingsByMember(req, res, next) {
        try {
            const data = await BorrowingService.getOverdueBorrowings(req.params.memberId);
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/borrowings/borrow
    static async borrowBook(req, res, next) {
        try {
            const data = await BorrowingService.borrowBook(req.body);
            res.status(201).json({
                success: true,
                message: 'Book borrowed successfully',
                data
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // PUT /api/borrowings/:id/return
    static async returnBook(req, res, next) {
        try {
            const data = await BorrowingService.returnBook(req.params.id);
            res.json({
                success: true,
                message: 'Book returned successfully',
                data
            });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // GET /api/borrowings/overdue
    static async getOverdueBorrowings(req, res, next) {
        try {
            const data = await BorrowingService.getOverdueBorrowings();
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BorrowingController;