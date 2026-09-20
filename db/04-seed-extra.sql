USE review_kantin;
GO

-- Seed tambahan untuk tabel yang belum terisi oleh 03-seed.sql.
-- Jalankan SETELAH 03-seed.sql (butuh data USERS dan REVIEWS).
-- Aman dijalankan ulang: tiap blok hanya berjalan jika tabelnya masih kosong.

-- ================================================================ LIKES
IF NOT EXISTS (SELECT 1 FROM dbo.LIKES)
BEGIN
    INSERT INTO dbo.LIKES (review_id, user_id) VALUES
        (1,  13),
        (1,  14),
        (2,  12),
        (4,  13),
        (4,  14),
        (4,  15),
        (5,  12),
        (8,  15),
        (10, 12),
        (11, 14);

    -- Samakan REVIEWS.like_count dengan jumlah baris sebenarnya di LIKES.
    UPDATE r
    SET r.like_count = x.jumlah
    FROM dbo.REVIEWS AS r
    JOIN (
        SELECT review_id, COUNT(*) AS jumlah
        FROM dbo.LIKES
        GROUP BY review_id
    ) AS x ON x.review_id = r.id;

    PRINT 'Seed LIKES selesai.';
END
GO

-- ================================================================ FLAGS
IF NOT EXISTS (SELECT 1 FROM dbo.FLAGS)
BEGIN
    INSERT INTO dbo.FLAGS (review_id, reported_by, reason, status) VALUES
        (2,  14, N'Komentar tidak relevan', N'pending'),
        (7,  12, N'Terindikasi spam',       N'pending'),
        (9,  13, N'Bahasa kurang pantas',   N'resolved'),
        (12, 15, N'Ulasan duplikat',        N'dismissed'),
        (16, 12, N'Informasi tidak akurat', N'pending');

    PRINT 'Seed FLAGS selesai.';
END
GO

-- ========================================================== AUDIT_LOGS
IF NOT EXISTS (SELECT 1 FROM dbo.AUDIT_LOGS)
BEGIN
    INSERT INTO dbo.AUDIT_LOGS (user_id, action, target_table, target_id, metadata) VALUES
        (1,  N'CREATE', N'STALLS',     1,  N'{"name":"Warung Bu Tini"}'),
        (2,  N'UPDATE', N'MENU_ITEMS', 1,  N'{"price":15000}'),
        (12, N'CREATE', N'REVIEWS',    1,  N'{"rating":5}'),
        (13, N'CREATE', N'LIKES',      1,  N'{"reviewId":1}'),
        (1,  N'UPDATE', N'FLAGS',      3,  N'{"status":"resolved"}'),
        (1,  N'DELETE', N'REVIEWS',    99, N'{"reason":"spam"}');

    PRINT 'Seed AUDIT_LOGS selesai.';
END
GO

PRINT 'Seed tambahan selesai.';
GO

-- ============================================================ VERIFIKASI
-- Semua tabel harus >= 5 baris (syarat tugas).
SELECT 'USERS'      AS tabel, COUNT(*) AS jumlah FROM dbo.USERS
UNION ALL SELECT 'STALLS',     COUNT(*) FROM dbo.STALLS
UNION ALL SELECT 'MENU_ITEMS', COUNT(*) FROM dbo.MENU_ITEMS
UNION ALL SELECT 'REVIEWS',    COUNT(*) FROM dbo.REVIEWS
UNION ALL SELECT 'LIKES',      COUNT(*) FROM dbo.LIKES
UNION ALL SELECT 'FLAGS',      COUNT(*) FROM dbo.FLAGS
UNION ALL SELECT 'AUDIT_LOGS', COUNT(*) FROM dbo.AUDIT_LOGS;
GO
