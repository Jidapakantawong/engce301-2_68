const db = require('./connection');

class BorrowingDatabase {

    // ===== GET ALL BORROWINGS =====
    static findAll() {
        const sql = `
            SELECT b.*, 
                   bk.title AS book_title,
                   m.name AS member_name
            FROM borrowings b
            JOIN books bk ON b.book_id = bk.id
            JOIN members m ON b.member_id = m.id
            ORDER BY b.id DESC
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // ===== GET BORROWING BY ID =====
    static findById(id) {
        const sql = `
            SELECT b.*, 
                   bk.title AS book_title,
                   m.name AS member_name
            FROM borrowings b
            JOIN books bk ON b.book_id = bk.id
            JOIN members m ON b.member_id = m.id
            WHERE b.id = ?
        `;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // ===== GET BORROWINGS BY MEMBER =====
    static findByMember(memberId) {
        const sql = `
            SELECT b.*, 
                   bk.title AS book_title
            FROM borrowings b
            JOIN books bk ON b.book_id = bk.id
            WHERE b.member_id = ?
            ORDER BY b.borrow_date DESC
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, [memberId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // ===== COUNT ACTIVE BORROWINGS (for limit 3) =====
    static countActiveBorrowings(memberId) {
        const sql = `
            SELECT COUNT(*) AS count
            FROM borrowings
            WHERE member_id = ? AND status = 'borrowed'
        `;

        return new Promise((resolve, reject) => {
            db.get(sql, [memberId], (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
    }

    // ===== CREATE BORROWING =====
    static create(borrowData) {
        const { book_id, member_id, borrow_date, due_date } = borrowData;

        const sql = `
            INSERT INTO borrowings (book_id, member_id, borrow_date, due_date, status)
            VALUES (?, ?, ?, ?, 'borrowed')
        `;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                [book_id, member_id, borrow_date, due_date],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    }

    // ===== UPDATE RETURN BOOK =====
    static returnBook(id, returnDate, status) {
        const sql = `
            UPDATE borrowings
            SET return_date = ?, status = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            db.run(sql, [returnDate, status, id], function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    }

    // ===== GET OVERDUE BORROWINGS =====
    static findOverdue() {
        const sql = `
            SELECT b.*, 
                   bk.title AS book_title,
                   m.name AS member_name
            FROM borrowings b
            JOIN books bk ON b.book_id = bk.id
            JOIN members m ON b.member_id = m.id
            WHERE b.status = 'borrowed' 
              AND DATE(b.due_date) < DATE('now')
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = BorrowingDatabase;