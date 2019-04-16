-- =====================================
-- ============= LIBRARIAN =============
-- =====================================
INSERT INTO LIBRARIAN (Tab_num, L_Surname, L_Name, L_Middle_name) 
VALUES (k, sur, name, m);

SELECT * FROM LIBRARIAN;

UPDATE LIBRARIAN 
SET L_Surname = newSur,
    L_Name = newName,
    L_Middle_name = newM
WHERE Tab_num = x;

DELETE FROM LIBRARIAN
WHERE Tab_num = x;

-- LIBRARIAN_PHONE
INSERT INTO LIBRARIAN_PHONE (L_Phone_num, L_Tab_num) 
VALUES (k, tabN);

SELECT * FROM LIBRARIAN_PHONE;

UPDATE LIBRARIAN_PHONE 
SET L_Phone_num = newNum
WHERE L_Tab_num = x AND L_Phone_num = n;

DELETE FROM LIBRARIAN_PHONE
WHERE L_Phone_num = x;

-- LIBRARIAN_EMAIL
INSERT INTO LIBRARIAN_EMAIL (L_Email, L_Tab_num) 
VALUES (k, tabN);

SELECT * FROM LIBRARIAN_EMAIL;

UPDATE LIBRARIAN_EMAIL 
SET L_Email = newE
WHERE L_Tab_num = x AND L_Email = n;

DELETE FROM LIBRARIAN_EMAIL
WHERE L_Email = x;

-- ======================================
-- ============= DEPARTMENT =============
-- ======================================
INSERT INTO DEPARTMENT (Dep_name, L_Tab_num) 
VALUES (k, tabN);

SELECT * FROM DEPARTMENT;

UPDATE DEPARTMENT 
SET Dep_name = newE,
    L_Tab_num = newTN
WHERE Dep_name = x;

DELETE FROM DEPARTMENT
WHERE Dep_name = x;

-- ====================================
-- ============= CATEGORY =============
-- ====================================
INSERT INTO CATEGORY (Category_name) 
VALUES (k);

SELECT * FROM CATEGORY;

UPDATE CATEGORY 
SET Category_name = newN
WHERE Category_name = x;

DELETE FROM CATEGORY
WHERE Category_name = x;

-- ==================================
-- ============= READER =============
-- ==================================
INSERT INTO READER (Reg_number, R_birth_date, Age_group,
    R_Surname, R_Name, R_Middle_name, L_Tab_num, Reg_date) 
VALUES (k, bd, ag, sur, name, m, tabN, rd);

SELECT * FROM READER;

UPDATE READER 
SET R_birth_date = newBD,
    Age_group = newAG,
    R_Surname = newS,
    R_Name = newN,
    R_Middle_name = newM,
    L_Tab_num = newT,
    Reg_date = newR
WHERE Reg_number = x;

DELETE FROM READER
WHERE Reg_number = x;

-- READER_PHONE
INSERT INTO READER_PHONE (R_Phone_num, R_Reg_num) 
VALUES (k, N);

SELECT * FROM READER_PHONE;

UPDATE READER_PHONE 
SET R_Phone_num = newNum
WHERE R_Reg_num = x AND R_Phone_num = n;

DELETE FROM READER_PHONE
WHERE R_Phone_num = x;

-- READER_EMAIL
INSERT INTO READER_EMAIL (R_Email, R_Reg_num) 
VALUES (k, N);

SELECT * FROM READER_EMAIL;

UPDATE READER_EMAIL 
SET R_Email = newE
WHERE R_Reg_num = x AND R_Email = n;

DELETE FROM READER_EMAIL
WHERE R_Email = x;

-- ===================================
-- ============= LOGBOOK =============
-- ===================================
INSERT INTO LOGBOOK (Logbook_code, Lb_year, R_Reg_num)
VALUES (k, y, regN);

SELECT * FROM LOGBOOK;

UPDATE LOGBOOK 
SET Lb_year = newY
WHERE Logbook_code = x;

DELETE FROM LOGBOOK
WHERE Logbook_code = x;

-- ================================
-- ============= BOOK =============
-- ================================
INSERT INTO BOOK (UDK_cypher, BBK_cypher, Book_name, C_Category_name) 
VALUES (k, bbk, name, cat);

SELECT * FROM BOOK;

UPDATE BOOK 
SET Book_name = newN,
    C_Category_name = newC
WHERE UDK_cypher = x;

DELETE FROM BOOK
WHERE UDK_cypher = x;

-- ==================================
-- ============= AUTHOR =============
-- ==================================
INSERT INTO AUTHOR (A_code, A_name, A_birth_date, Auth_nickname)
VALUES (k, name, bd, nick);

SELECT * FROM AUTHOR;

UPDATE AUTHOR 
SET A_name = newN,
    A_birth_date = newBD,
	Auth_nickname = newNick
WHERE A_code = x;

DELETE FROM AUTHOR
WHERE A_code = x;

-- =========================================
-- ============= BOOK_INSTANCE =============
-- =========================================
INSERT INTO BOOK_INSTANCE (Inv_num, Publ_year, Language, R_Reg_num,
    Booking_expires, Is_available, B_UDK_cypher, D_Dep_name, D_place) 
VALUES (k, y, l, regN, bE, av, udk, dep, pl);

SELECT * FROM BOOK_INSTANCE;

UPDATE BOOK_INSTANCE 
SET Publ_year = newPY, 
    Language = newL,
    Booking_expires = newBe,
    Is_available = newIa,
    D_Dep_name = newDep,
    D_place = newPlace
WHERE Inv_num = x;

DELETE FROM BOOK_INSTANCE
WHERE Inv_num = x;

-- =======================================
-- ============= CONNECTIONS =============
-- =======================================

--  BOOK_INSTANCE_TO_LOGBOOK
INSERT INTO BOOK_INSTANCE_TO_LOGBOOK (L_Logbook_code, B_Inv_number,
    Date_taken, Date_to_return, Booking_time) 
VALUES (k, y, t, r, bt);

SELECT * FROM BOOK_INSTANCE_TO_LOGBOOK;

UPDATE BOOK_INSTANCE_TO_LOGBOOK 
SET Date_taken = newT,
    Date_to_return = newR,
    Booking_time = nwT
WHERE L_Logbook_code = x AND B_Inv_number = y;

DELETE FROM BOOK_INSTANCE_TO_LOGBOOK
WHERE L_Logbook_code = x AND B_Inv_number = y;

-- AUTHOR_TO_BOOK
INSERT INTO AUTHOR_TO_BOOK (A_Auth_code, B_UDK_cypher) 
VALUES (k, u);

SELECT * FROM AUTHOR_TO_BOOK;

DELETE FROM AUTHOR_TO_BOOK
WHERE A_Auth_code = x AND B_UDK_cypher = y;