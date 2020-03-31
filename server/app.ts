import express, {  Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './connect';
import { BooksRoutes } from './routes/books/book.route';

const app: Application = express();
const bookRoutes = new BooksRoutes();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes.getRouter());

connect();

const server = app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});

/*
const express = require('express'),
      fs =  require('fs'),
      path = require('path'),
      port = 3000,
      cors = require('cors'),
      bodyParser = require("body-parser"),
      mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/libraryDB', {useUnifiedTopology: true,  useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected.');
});

app.use(cors());
app.use(bodyParser.json());

function getAllBooks(){
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './stubs/books.json'), 'utf-8' , (err, contents)=> {
      if (err) reject(err); // we'll not consider error handling for now
      resolve(contents);
    });
  });
}

function getBookByIsbn(isbn){
  return new Promise((resolve, reject) => {
    getAllBooks().then(contents => {
      const books = contents.books;
      const bookInfo = books.filter( (book)=> {
        return book.isbn === isbn;
      });
      resolve(bookInfo);
    });
  });
}

app.get('/', (req, res) => {
  getAllBooks()
    .then(contents => res.json(contents));
});

app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  getAllBooks().then(contents => {
    getBookByIsbn(isbn).then((bookInfo) => res.json(bookInfo));
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`))

****/
