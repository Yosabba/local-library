const findAuthorById = (authors, id) => {
  return authors.find((author) => author.id === id);
};

const findBookById = (books, id) => {
  return books.find((book) => book.id === id);
};

const partitionBooksByBorrowedStatus = books => {
  let borrowedBooks = [];
  let returnedBooks = [];
  const currentBookStatus = [];

  books.map((book) => {
    const isBookReturned = book.borrows[0].returned;
    isBookReturned ? returnedBooks.push(book) : borrowedBooks.push(book);
  });

  currentBookStatus.push(borrowedBooks);
  currentBookStatus.push(returnedBooks);
  return currentBookStatus;
};


const getBorrowersForBook = (book, accounts) => {
  const bookOfBorrowers = book.borrows
    .map((borrow) => {
      let account = accounts.find((account) => account.id === borrow.id);
      return { ...borrow, ...account };
    })
    .slice(0, 10);

  return bookOfBorrowers

  
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
