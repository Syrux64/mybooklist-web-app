const express = require('express');
const router = express.Router();
const axios = require('axios');
const lodash = require('lodash');

require('dotenv').config();
const apiKeyBooks = process.env.API_KEY_BOOKS;



router.get('/book/:title', async (req, res) =>{
    try {
    const data = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&key=${apiKeyBooks}`);
    console.log(req.params.title);
    const book = data.data.items[0].volumeInfo;
    res.json({
        bookTitle : book.title || 'Title not available',
        bookAuthor : book.authors ? book.authors.join(', ') : 'Author not available',
        bookCover : book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150',
        book_isbn_10 : book.industryIdentifiers && book.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10')
    });} catch(error){
        console.log("Error fetching the book:", error);
    }
})



router.get('/genre/:subject', async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${req.params.subject}&maxResults=10&key=${apiKeyBooks}`);
        const books = response.data.items;
        const genreBooks = [];
        const shuffledBooks = lodash.shuffle(books);

        for (let i = 0; i < 150; i++) {
            try{
                const book = shuffledBooks[i];
                if (!book || !book.volumeInfo) continue;
                const volumeInfo = book.volumeInfo;
                genreBooks.push({
                    bookTitle: volumeInfo.title || 'Title not available',
                    bookAuthor: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Author not available',
                    bookCover: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
                });
            } catch(error){console.log("error shuffling books:", error)}
        }


        res.json(genreBooks); 
    } catch (error) {
        console.log("Error fetching the books:", error);
        res.status(500).json({ error: 'Error fetching the books' });
    }
});

router.get('/view/genre/:subject', async(req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${req.params.subject}&maxResults=40&key=${apiKeyBooks}`);
        const books = response.data.items;
        const genreBooks = [];
        const shuffledBooks = lodash.shuffle(books);

        for (let i = 0; i < 150; i++) {
            try{
                const book = shuffledBooks[i];
                if (!book || !book.volumeInfo) continue;
                const volumeInfo = book.volumeInfo;
                genreBooks.push({
                    bookTitle: volumeInfo.title || 'Title not available',
                    bookAuthor: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Author not available',
                    bookCover: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
                });
            } catch(error){console.log("error shuffling books:", error)}
        }


        res.json(genreBooks); 
    } catch (error) {
        console.log("Error fetching the books:", error);
        res.status(500).json({ error: 'Error fetching the books' });
    }
})

router.get('/view/book/:title', async (req, res) =>{
    // res.send(req.params.title);
    try {
    const data = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&key=${apiKeyBooks}`);
    
    const book = data.data.items[0].volumeInfo;
    res.json({
        bookTitle : book.title || 'Title not available',
        bookAuthor : book.authors ? book.authors.join(', ') : 'Author not available',
        bookCover : book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150',
        bookDescription : book.description || 'Description not available',
        bookPublishedDate : book.publishedDate.toString() || 'Published date not available',
        bookPublisher : book.publisher || 'Not available',
        isbn10 : book.industryIdentifiers && book.industryIdentifiers[0] ? 
            book.industryIdentifiers[0].identifier : 'Not available',
        isbn13 : book.industryIdentifiers && book.industryIdentifiers[1] ? 
            book.industryIdentifiers[1].identifier : 'Not available',
        bookRating: book.averageRating || 'N/A',
        bookCategory: book.categories[0] || 'N/A'
        


    });} catch(error){
        console.log("Error fetching the book:", error);
    }
})


router.get('/search/:title', async(req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&maxResults=40&key=${apiKeyBooks}`);
        const books = response.data.items;
        const Books = [];
        const shuffledBooks = lodash.shuffle(books);

        for (let i = 0; i < 150; i++) {
            try{
                const book = shuffledBooks[i];
                if (!book || !book.volumeInfo) continue;
                const volumeInfo = book.volumeInfo;
                Books.push({
                    bookTitle: volumeInfo.title || 'Title not available',
                    bookAuthor: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Author not available',
                    bookCover: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
                });
            } catch(error){console.log("error shuffling books:", error)}
        }


        res.json(Books); 
    } catch (error) {
        console.log("Error fetching the books:", error);
        res.status(500).json({ error: 'Error fetching the books' });
    }  
});


router.get('/view/author/:author', async(req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${req.params.author}&maxResults=40&key=${apiKeyBooks}`);
        const books = response.data.items;
        const Books = [];
        const shuffledBooks = lodash.shuffle(books);

        for (let i = 0; i < 150; i++) {
            try{
                const book = shuffledBooks[i];
                if (!book || !book.volumeInfo) continue;
                const volumeInfo = book.volumeInfo;
                Books.push({
                    bookTitle: volumeInfo.title || 'Title not available',
                    bookAuthor: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Author not available',
                    bookCover: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
                });
            } catch(error){console.log("error shuffling books:", error)}
        }


        res.json(Books); 
    } catch (error) {
        console.log("Error fetching the books:", error);
        res.status(500).json({ error: 'Error fetching the books' });
    }  
    
})


// new feed -->
// need to be implemented




module.exports = router;