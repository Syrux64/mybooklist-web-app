const express = require('express');
const router = express.Router();

const { createPool } = require('mysql');
require('dotenv').config();
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error acquiring connection from pool:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});


pool.on('error', (err) => {
    console.error('Error connecting to MySQL database:', err);
});


pool.query(`CREATE TABLE IF NOT EXISTS user(
                userId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100)
    );`, (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
});




pool.query(`CREATE TABLE IF NOT EXISTS book(
                bookId INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100),
                author VARCHAR(200),
                publisher VARCHAR(100),
                publishDate VARCHAR(20),
                isbn VARCHAR(100),
                description VARCHAR(3000),
                cover VARCHAR(300),
                category varchar(50)
            
    );`, (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
});

pool.query(`CREATE TABLE IF NOT EXISTS post(
                postId INT AUTO_INCREMENT PRIMARY KEY,
                postedDate DATE,
                score INT,
                status VARCHAR(20),
                thoughts VARCHAR(500),
                bookId INT,
                postedBy INT,
                FOREIGN KEY (bookId) REFERENCES book(bookId),
                FOREIGN KEY (postedBy) REFERENCES user(userId)
    );`, (err, result, fields) => {
    if (err) {
    return console.log(err);
    }
});


pool.query(`SELECT * FROM user;`, (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
});



// get username to show on the topbar
router.post('/get/username', (req, res) => {

    pool.query('SELECT name FROM user WHERE email = ?', [req.body.email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ userName: result[0].name }); // Assuming there's only one user with the provided email
    });
});



// submit user data to DB
router.post('/submit/user', (req, res) => {
    pool.query('SELECT name FROM user WHERE name = ?', [req.body.userName], (selectNameErr, selectNameResult) => {
        if (selectNameErr) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (selectNameResult.length > 0) {
            return res.status(409).json({ error: 'Name already exists' });
        }

        pool.query('SELECT email FROM user WHERE email = ?', [req.body.email], (selectEmailErr, selectEmailResult) => {
            if (selectEmailErr) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (selectEmailResult.length > 0) {
                return res.status(408).json({ error: 'Email already exists' });
            }
        
            pool.query('INSERT INTO user (name, email) VALUES (?, ?)', [req.body.userName, req.body.email], (insertErr, result) => {
                if (insertErr) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.json({ message: 'Data inserted successfully' });
            });

        });
    });
});





// add book to db
router.post('/submit/book', (req, res) => {
    const title = req.body.title;
    const book = req.body.bookData;
    const score = req.body.score;
    const status = req.body.status;
    const thoughts = req.body.thoughts;

    pool.query(`INSERT INTO book (title, author, publisher, publishDate, isbn, description, cover, category)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
                [title, book.bookAuthor, book.bookPublisher, book.bookPublishedDate, book.isbn10 || book.isbn13,  
                    book.bookDescription, book.bookCover, book.bookCategory],
                (err, bookResult)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).send('Error inserting book data');
                    }
                    const bookId = bookResult.insertId;
                    let userId;
                    

                    pool.query(`SELECT userId FROM user where email = ?`, [req.body.email], (err, result)=>{
                        userId = result[0].userId;
                        
                    
                    
                    pool.query(`INSERT INTO post(postedDate, score, status, thoughts, bookId, postedBy)
                                VALUES (NOW(), ?, ?, ?, ?, ?)`,
                                [score, status, thoughts, bookId, userId],
                                (err, postResult) => {
                                    if(err){
                                        console.log(err);
                                        return res.status(500).send('Error creating post');
                                    }
                                    res.status(200).send('Posted Successfully');
                                }
                            )
                    })
                }
                )

})


// Get community 
router.get('/community', (req, res) => {
    
    pool.query(`SELECT 
    post.postId,
    post.postedDate,
    post.score,
    post.status,
    post.thoughts,
    book.title AS bookTitle,
    book.cover as bookCover,
    book.author as bookAuthor,
    user.name AS postedBy
FROM 
    post
JOIN 
    book ON post.bookId = book.bookId
JOIN 
    user ON post.postedBy = user.userId;
`, (err, result) => {
        if (err) {
            return console.log(err);
        }
        return res.json(result);
    });


})


module.exports = router;
