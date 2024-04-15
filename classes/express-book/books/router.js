import express from 'express';
import { books, authors, validAuthorId } from './utils.js';

const booksRt = express.Router();
export default booksRt;

booksRt
  .get('/', (req, res) => {
    try {
      res.status(200).send(books);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .get('/:id', (req, res) => {
    try {
      const id = Number(req.params.id);
      if (id) {
        const book = books.find((item) => item.id === id);
        if (!book) return res.status(404).send('Book not found');
        const bookExt = { ...book };
        bookExt.author = authors.find((item) => (item.id = book.authorId));
        res.status(200).send(bookExt);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .post('/', (req, res) => {
    try {
      if (!validAuthorId(req.body.authorId)) return res.status(400).send('Author does not exists');
      const book = {
        name: req.body.name,
        price: req.body.price,
        authorId: req.body.authorId,
        id: books.length + 1,
      };
      if (book.name.length == 0) return res.status(400).send("Book name couldn't be empty");
      if (book.price <= 0) return res.status(400).send("Price can't be negative");
      books.push(book);
      res.status(201).end();
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .put('/:id', (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!validAuthorId(req.body.authorId)) return res.status(400).send('Author does not exists');
      const book = books.find((item) => item.id === id);
      if (!book) return res.status(404).send('Book not found');
      book.name = req.body.name;
      if (book.name.length == 0) return res.status(400).send("Book name couldn't be empty");
      book.price = req.body.price;
      if (book.price <= 0) return res.status(400).send("Price can't be negative");
      book.authorId = req.body.authorId;
      books.push(book);
      res.status(201).end();
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete('/:id', (req, res) => {
    try {
      const id = Number(req.params.id);
      if (id) {
        const bookInd = books.findIndex((item) => item.id === id);
        if (bookInd == -1) return res.status(404).send('Book not found');
        books.splice(bookInd, 1);
        res.status(204).end();
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
