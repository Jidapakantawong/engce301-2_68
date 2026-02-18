const express = require('express');
const router = express.Router();
const BorrowingController = require('../controllers/borrowing.controller');

// GET /api/borrowings
router.get('/', BorrowingController.getAllBorrowings);

// GET /api/borrowings/:id
router.get('/:id', BorrowingController.getBorrowingById);

// GET /api/borrowings/member/:memberId
router.get('/member/:memberId', BorrowingController.getBorrowingsByMember);

// POST /api/borrowings/borrow
router.post('/borrow', BorrowingController.borrowBook);

// PUT /api/borrowings/:id/return
router.put('/:id/return', BorrowingController.returnBook);

// GET /api/borrowings/overdue
router.get('/overdue', BorrowingController.getOverdueBorrowings);

module.exports = router;