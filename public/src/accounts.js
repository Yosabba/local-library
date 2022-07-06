const helperFunction = (accounts, id) => {
  const foundAccount = accounts.find((account) => account.id === id);
  return foundAccount;
};

const findAccountById = (accounts, id) => {
  return helperFunction(accounts, id);
};

const sortAccountsByLastName = accounts => {
  const sortedAccount = accounts.sort((a, b) =>
    a.name.last > b.name.last ? 1 : -1
  );

  return sortedAccount;
};

const getTotalNumberOfBorrows = (account, books) => {
  const totoalBorrows = books.reduce((total, book) => {
    return (
      total + book.borrows.filter((borrow) => borrow.id === account.id).length
    );
  }, 0);

  return totoalBorrows;
};

const getBooksPossessedByAccount = (account, books, authors) => {
  const booksPossessed = books
    .filter((book) => {
      return book.borrows.some(
        (borrow) => !borrow.returned && borrow.id === account.id
      );
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      const bookCopy = {
        id: book.id,
        title: book.title,
        genre: book.genre,
        authorId: book.authorId,
        author: author,
        borrows: book.borrows,
      };

      return bookCopy;
    });

  return booksPossessed;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
