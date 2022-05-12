import { addBookToFirestore, removeBookFromFirestore, updateReadStatusInFirestore } from '../index';
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
    removeBookFromFirestore(bookID);
  }

  getBook(bookID) {
    return this.books.find(({ book, id }) => id === bookID);
  }

  updateBookReadStatus(bookID) {
    this.getBook(bookID).book.changeReadStatus();
    const newBookReadStatus = this.getBook(bookID).book.isRead;
    updateReadStatusInFirestore(bookID, newBookReadStatus);
  }
}

export default Library;
