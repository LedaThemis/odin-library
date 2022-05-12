import { addBookToFirestore } from '../index';
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    addBookToFirestore(book);
  }

  removeAtIndex(arr, i) {
    return arr.slice(0, i).concat(arr.slice(i + 1));
  }

  removeBook(i) {
    this.books = this.removeAtIndex(this.books, i);
  }
}

export default Library;
