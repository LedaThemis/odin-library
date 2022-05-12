import { addBookToFirestore } from '../index';
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    const bookID = addBookToFirestore(book);

    this.books.push({ book: book, id: bookID });
  }

  appendBook(book, id) {
    this.books.push({ book: book, id: id });
  }

  removeBook(bookID) {
    this.books = this.books.filter(({ book, id }) => id !== bookID);
  }
}

export default Library;
