const getTotalBooksCount = (books) => {
  const totalBooks = books.length;

  return totalBooks;
};

const getTotalAccountsCount = (accounts) => {
  const totalAccounts = accounts.length;

  return totalAccounts;
};

const getBooksBorrowedCount = (books) => {
  const booksBorrowed = books.reduce((acc, author) => {
    if (!author.borrows[0].returned) {
      acc += 1;
    }

    return acc;
  }, 0);

  return booksBorrowed;
};

const getMostCommonGenres = (books) => {
  let mostCommonGenres = [];

  books.map((author) => {
    mostCommonGenres[author.genre]
      ? mostCommonGenres[author.genre]++
      : (mostCommonGenres[author.genre] = 1);
  });
  return Object.entries(mostCommonGenres)
    .map(([name, count]) => {
      return {
        name,
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

const getMostPopularBooks = (books) => {
  const popularBooks = books
    .map((author) => {
      return { name: author.title, count: author.borrows.length };
    })
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);

  return popularBooks;
};

const getMostPopularAuthors = (books, authors) => {
  let mostPopularAuthors = [];

  authors.map((author) => {
    let popularAuthorInfo = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.map((book) => {
      book.authorId === author.id
        ? (popularAuthorInfo.count += book.borrows.length)
        : null;
    });
    mostPopularAuthors.push(popularAuthorInfo);
  });

  return mostPopularAuthors.sort((a, b) => b.count - a.count).slice(0, 5);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
