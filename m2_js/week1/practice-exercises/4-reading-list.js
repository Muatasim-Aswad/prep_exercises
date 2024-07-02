/**
 * Keep track of which books you read and which books you want to read!
 *
 * Follow the steps:
 *  Declare a variable that holds an array of 3 objects, where each object describes a book and has properties for the title (string), author (string), and alreadyRead (boolean indicating if you read it yet).
 *  Loop through the array of books.
 *  For each book, log the book title and book author like so: "The Hobbit by J.R.R. Tolkien".
 *  Create a conditional statement to change the log depending on whether you read it yet or not. If you read it, log a string like You already read "The Hobbit" right after the log of the book details
 *  If you haven't read it log a string like You still need to read "The Lord of the Rings"
 */
const bookObject = (title = '', author = '', alreadyRead = false) => {
  return {
    title,
    author,
    alreadyRead,
  };
};

const books = [];
books[0] = bookObject('The Hobbit', 'J.R.R. Tolkien', true);
books[1] = bookObject('It', 'Stephen King', false);
books[2] = bookObject('Dune', 'Frank Herbert', true);

books.forEach((book) =>
  console.log(
    `"${book.title} by ${book.author}" ${
      book.alreadyRead ? 'already read' : 'to read ...'
    }`,
  ),
);
