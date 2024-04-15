import express from 'express';
import booksRt from './books/router.js';
const app = express();
const port = 3000;

export default app;

app.use(express.json());
app.use('/books', booksRt);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
