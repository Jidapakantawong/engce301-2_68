-- ============================================
-- Library Management System Database Schema
-- ============================================

PRAGMA foreign_keys = ON;

-- ===== BOOKS TABLE =====
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE,
    category TEXT,
    total_copies INTEGER NOT NULL DEFAULT 1 CHECK(total_copies >= 0),
    available_copies INTEGER NOT NULL DEFAULT 1 CHECK(available_copies >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===== MEMBERS TABLE =====
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    membership_date DATE DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK(status IN ('active', 'inactive'))
);


-- ===== BORROWINGS TABLE =====
CREATE TABLE IF NOT EXISTS borrowings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status TEXT NOT NULL CHECK(status IN ('borrowed', 'returned', 'overdue')),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);


-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);

CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

CREATE INDEX IF NOT EXISTS idx_borrowings_book_id ON borrowings(book_id);
CREATE INDEX IF NOT EXISTS idx_borrowings_member_id ON borrowings(member_id);
CREATE INDEX IF NOT EXISTS idx_borrowings_status ON borrowings(status);


-- ===== SAMPLE DATA: Books =====
INSERT INTO books (title, author, isbn, category, total_copies, available_copies) VALUES
    ('Clean Code', 'Robert C. Martin', '978-0132350884', 'Programming', 5, 5),
    ('The Pragmatic Programmer', 'Andrew Hunt', '978-0135957059', 'Programming', 3, 3),
    ('Design Patterns', 'Erich Gamma', '978-0201633610', 'Software Architecture', 2, 2),
    ('Introduction to Algorithms', 'Thomas H. Cormen', '978-0262033848', 'Computer Science', 4, 2),
    ('Database System Concepts', 'Abraham Silberschatz', '978-0073523323', 'Database', 3, 3),
    ('Docker Deep Dive', 'Nigel Poulton', '978-1521822807', 'DevOps', 2, 1),
    ('Learning React', 'Alex Banks', '978-1492044239', 'Web Development', 5, 4),
    ('Node.js Design Patterns', 'Mario Casciaro', '978-1839214110', 'Web Development', 3, 2);

-- ===== SAMPLE DATA: Members =====
INSERT INTO members (name, email, phone, status) VALUES
    ('แมวส้ม จอมซน', 'meowsom@email.com', '0955555555', 'active'),
    ('แมวดำ มัวมืดมิด', 'meowdam@email.com', '0644444444', 'active'),
    ('แมวเทา นอนเหงาหงอย', 'meowtao@email.com', '0888888888', 'inactive');


-- ===== SAMPLE DATA: Borrowings =====
-- 1. (ยังไม่คืน)
INSERT INTO borrowings (book_id, member_id, borrow_date, due_date, status) VALUES
    (1, 1, '2026-01-01', '2026-01-15', 'borrowed');

-- 2. (คืนแล้ว)
INSERT INTO borrowings (book_id, member_id, borrow_date, due_date, return_date, status) VALUES
    (3, 2, '2025-12-01', '2025-12-15', '2025-12-14', 'returned');

-- 3. ยืม (เกินกำหนด)
INSERT INTO borrowings (book_id, member_id, borrow_date, due_date, status) VALUES
    (5, 1, '2025-12-01', '2025-12-10', 'overdue');
