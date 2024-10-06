const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();
const supabase = createClient(process.env.DB_URL, process.env.DB_KEY)



// Get username to show on the topbar
router.post('/get/username', async (req, res) => {
    const { data, error } = await supabase
        .from('user')
        .select('name')
        .eq('email', req.body.email)
        .single();

    if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ userName: data.name });
});

// Submit user data to DB
router.post('/submit/user', async (req, res) => {
    // Check if the name already exists
    const { data: nameCheck, error: nameError } = await supabase
        .from('user')
        .select('name')
        .eq('name', req.body.userName);

    if (nameError) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (nameCheck.length > 0) {
        return res.status(409).json({ error: 'Name already exists' });
    }

    // Check if the email already exists
    const { data: emailCheck, error: emailError } = await supabase
        .from('user')
        .select('email')
        .eq('email', req.body.email);

    if (emailError) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (emailCheck.length > 0) {
        return res.status(408).json({ error: 'Email already exists' });
    }

    // Insert new user
    const { error: insertError } = await supabase
        .from('user')
        .insert([{ name: req.body.userName, email: req.body.email }]);

    if (insertError) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({ message: 'Data inserted successfully' });
});

// Add book to DB
router.post('/submit/book', async (req, res) => {
    const title = req.body.title;
    const book = req.body.bookData;
    const score = req.body.score;
    const status = req.body.status;
    const thoughts = req.body.thoughts;

    // Insert new book
    const { data: bookData, error: bookInsertError } = await supabase
        .from('book')
        .insert([{
            title,
            author: book.bookAuthor,
            publisher: book.bookPublisher,
            publishDate: book.bookPublishedDate,
            isbn: book.isbn10 || book.isbn13,
            description: book.bookDescription,
            cover: book.bookCover,
            category: book.bookCategory
        }]).select();

    if (bookInsertError) {
        console.log(bookInsertError);
        return res.status(500).send('Error inserting book data');
    }

    const bookId = bookData[0].bookId; // Get the inserted bookId

    // Get the userId based on email
    const { data: userData, error: userSelectError } = await supabase
        .from('user')
        .select('userId')
        .eq('email', req.body.email)
        .single();

    if (userSelectError) {
        console.log(userSelectError);
        return res.status(500).send('Error fetching user data');
    }

    const userId = userData.userId;

    // Insert post
    const { error: postInsertError } = await supabase
        .from('post')
        .insert([{
            postedDate: new Date().toISOString(),
            score,
            status,
            thoughts,
            bookId,
            postedBy: userId
        }]);

    if (postInsertError) {
        console.log(postInsertError);
        return res.status(500).send('Error creating post');
    }

    res.status(200).send('Posted Successfully');
});

// Get community
router.get('/community', async (req, res) => {
    const { data, error } = await supabase
        .from('post')
        .select(`
            postId,
            postedDate,
            score,
            status,
            thoughts,
            book(title, cover, author),
            user(name)
        `);

    if (error) {
        return console.log(error);
    }
    return res.json(data);
});

module.exports = router;
