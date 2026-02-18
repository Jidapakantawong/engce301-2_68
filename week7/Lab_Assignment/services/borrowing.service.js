const BorrowingDB = require('../database/borrowings.db.js');
const BookDB = require('../database/books.db.js');
const MemberDB = require('../database/members.db.js');

class BorrowingService {
    // ===== BORROW BOOK =====
    static async borrowBook(borrowData) {
        try {
            const { book_id, member_id } = borrowData;

            // TODO: 1. ตรวจสอบว่า book มีอยู่จริงและมีเล่มว่าง
            const book = await BookDB.findById(book_id);
            if (!book) throw new Error('Book not found');
            if (book.available_copies <= 0) throw new Error('No available copies');

            // TODO: 2. ตรวจสอบว่า member มีอยู่จริงและ status = 'active'
            const member = await MemberDB.findById(member_id);
            if (!member) throw new Error('Member not found');
            if (member.status !== 'active') throw new Error('Member is not active');

            // TODO: 3. ตรวจสอบว่า member ยืมไม่เกิน 3 เล่ม
            const count = await BorrowingDB.countActiveBorrowings(member_id);
            if (count >= 3) throw new Error('Borrow limit exceeded (max 3 books)');

            // TODO: 4. คำนวณ due_date (14 วันจากวันนี้)
            const borrowDate = new Date();
            const dueDate = new Date();
            // เติมโค้ดคำนวณ due_date
            dueDate.setDate(borrowDate.getDate() + 14);

            const borrow_date = borrowDate.toISOString().split('T')[0];
            const due_date = dueDate.toISOString().split('T')[0];


            // TODO: 5. สร้าง borrowing record
            const result = await BorrowingDB.create({
                book_id,
                member_id,
                borrow_date,
                due_date
            });


            // TODO: 6. ลด available_copies
            await BookDB.decreaseAvailableCopies(book_id);

            return {
                id: result.id,
                book_id,
                book_title: book.title,
                member_id,
                member_name: member.name,
                borrow_date,
                due_date,
                status: 'borrowed'
            };

        } catch (error) {
            throw error;
        }
    }

    // ===== RETURN BOOK =====
    static async returnBook(borrowingId) {
        try {
            const borrowing = await BorrowingDB.findById(borrowingId);
            if (!borrowing) throw new Error('Borrowing record not found');
            if (borrowing.status === 'returned') throw new Error('Book already returned');

            const returnDate = new Date().toISOString().split('T')[0];

            // คำนวณค่าปรับ
            const due = new Date(borrowing.due_date);
            const returned = new Date(returnDate);

            let days_overdue = 0;
            let fine = 0;
            let status = 'returned';

            if (returned > due) {
                days_overdue = Math.ceil(
                    (returned - due) / (1000 * 60 * 60 * 24)
                );
                fine = days_overdue * 20;
                status = 'overdue';
            }

            // update borrowing
            await BorrowingDB.returnBook(borrowingId, returnDate, status);

            // เพิ่ม available_copies
            await BookDB.increaseAvailableCopies(borrowing.book_id);

            return {
                id: borrowingId,
                return_date: returnDate,
                days_overdue,
                fine
            };
        } catch (error) {
            throw error;
        }
    }

    // TODO: เขียน getOverdueBorrowings
    static async getOverdueBorrowings() {
        return await BorrowingDB.findOverdue();
    }
}

module.exports = BorrowingService;