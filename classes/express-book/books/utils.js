const authors = [
  { id: 1, name: 'Jane Austen', dateOfBirth: '1775-12-16' },
  { id: 2, name: 'Charles Dickens', dateOfBirth: '1812-02-07' },
  { id: 3, name: 'Mark Twain', dateOfBirth: '1835-11-30' },
  { id: 4, name: 'Agatha Christie', dateOfBirth: '1890-09-15' },
];

const books = [
  { id: 1, name: 'Sense and Sensibility', price: 9.99, authorId: 1 },
  { id: 2, name: 'Emma', price: 8.75, authorId: 1 },
  { id: 3, name: 'Mansfield Park', price: 10.5, authorId: 1 },
  { id: 4, name: 'Northanger Abbey', price: 7.25, authorId: 1 },
  { id: 5, name: 'David Copperfield', price: 11.99, authorId: 2 },
  { id: 6, name: 'A Tale of Two Cities', price: 10.25, authorId: 2 },
  { id: 7, name: 'Great Expectations', price: 12.5, authorId: 2 },
  { id: 8, name: 'The Adventures of Tom Sawyer', price: 8.25, authorId: 3 },
  { id: 9, name: 'The Prince and the Pauper', price: 9.5, authorId: 3 },
  { id: 10, name: "A Connecticut Yankee in King Arthur's Court", price: 11.75, authorId: 3 },
  { id: 11, name: 'The Murder of Roger Ackroyd', price: 10.99, authorId: 4 },
  { id: 12, name: 'Death on the Nile', price: 12.25, authorId: 4 },
  { id: 13, name: 'And Then There Were None', price: 9.75, authorId: 4 },
];

function validAuthorId(id){
  return authors.find((item)=>item.id===id)!=undefined
}

export {authors, books, validAuthorId};
