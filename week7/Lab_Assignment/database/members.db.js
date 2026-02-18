const db = require('./connection');

class MemberDatabase {

    // ===== GET ALL MEMBERS =====
    static findAll() {
        const sql = 'SELECT * FROM members ORDER BY id DESC';

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // ===== GET MEMBER BY ID =====
    static findById(id) {
        const sql = 'SELECT * FROM members WHERE id = ?';

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // ===== CREATE MEMBER =====
    static create(memberData) {
        const { name, email, phone, status } = memberData;

        const sql = `
            INSERT INTO members (name, email, phone, status)
            VALUES (?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                [name, email, phone, status],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    }

    // ===== UPDATE MEMBER =====
    static update(id, memberData) {
        const { name, email, phone, status } = memberData;

        const sql = `
            UPDATE members
            SET name = ?, email = ?, phone = ?, status = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                [name, email, phone, status, id],
                function (err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    }

    // ===== FIND BY EMAIL (ใช้ตอน validation) =====
    static findByEmail(email) {
        const sql = 'SELECT * FROM members WHERE email = ?';

        return new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
}

module.exports = MemberDatabase;