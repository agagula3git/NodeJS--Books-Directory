const express = require('express');
const books = require('../../Books');

const router = express.Router();

// Get all books
router.get('/',(req,res)=>{
    res.json(books);
});

// Get book with req.params
router.get('/:ISBN',(req,res)=>{
    const found = books.sort(book => book.ISBN === req.params.ISBN);
    if(found){
        res.json(books.filter(book => book.ISBN === req.params.ISBN));
    }else{
        res.status(404).json({msg:`No book with ISBN of ${req.params.ISBN}`});
    }
});

//Add new book
router.post('/',(req,res)=>{
    const newBook = {
        ISBN: req.body.ISBN,
        title: req.body.title,
        author: req.body.author,
        published: req.body.published,
        publisher: req.body.publisher,
        pages: req.body.pages,
        categories: req.body.categories,
        status: "unreaded"
    }

    if(!newBook.ISBN || !newBook.title || !newBook.author || !newBook.published ||
        !newBook.publisher || !newBook.pages || !newBook.categories){
         return res.status(404).json({msg: 'Can\'t add incomplete newBook member!'});
    }

    books.push(newBook);
    res.json(books);
});

//Update Book
router.put('/:ISBN',(req,res)=>{
    const found = books.some(book => book.ISBN === req.params.ISBN);
    if(found){
        books.forEach(book =>{
            if(book.ISBN === req.params.ISBN){
                book.ISBN = req.body.ISBN ? req.body.ISBN : book.ISBN;
                book.title = req.body.title ? req.body.title : book.title;
                book.author = req.body.author ? req.body.author : book.author;
                book.published = req.body.published ? req.body.published : book.published;
                book.publisher = req.body.publisher ? req.body.publisher : book.publisher;
                book.pages = req.body.pages ? req.body.pages : book.pages;
                book.categoreis = req.body.categories ? req.body.categories : book.categories;
                book.status = req.body.status ? req.body.status : book.status;
            }
        });
    }else{
        res.status(404).json({msg :`No book with ISBN of ${req.params.ISBN}`});
    }
    res.json(books);
});

//Delete book
router.delete('/:ISBN',(req,res)=>{
    const found = books.some(book => book.ISBN === req.params.ISBN);
    if(found){
        res.json(books.filter(book => book.ISBN !== req.params.ISBN));
    }else{
        res.status(404).json({msg: `No book with ISBN of ${req.params.ISBN}`});
    }
    res.json(books);
});

module.exports = router;