const express = require('express'),
      fs =  require('fs'),
      path = require('path'),
      port = 3000,
      cors = require('cors'),
      bodyParser = require("body-parser");;

const app = express();

app.use(cors());
app.use(bodyParser.json());

function getAllBooks(){
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './stubs/books.json'), 'utf-8' , (err, contents)=> {
      if (err) reject(err); // we'll not consider error handling for now
      let jsonData = JSON.parse(contents.replace(/\r?\n|\r/g, ''));
      resolve(jsonData);
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
