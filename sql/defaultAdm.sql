DELETE FROM financi_user
WHERE username = 'admin';

INSERT INTO financi_user
(name, username, password, fixedIncome, balance, email, isadmin)
VALUES ('Admin', 'admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 99999, 99999, 'admin@admin.com', true);