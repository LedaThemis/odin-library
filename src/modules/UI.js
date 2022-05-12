import Book from './Book';
import Library from './Library';

class UI {
  constructor() {
    const library = new Library();

    this.library = library;
  }

  update(books) {
    const booksContainer = document.querySelector('#books-container');
    booksContainer.replaceChildren();
    if (books) {
      books.forEach((book, index) => this.appendBook(book, index));
    } else {
      this.library.books.forEach((book, index) => this.appendBook(book, index));
    }
  }

  appendBook(book, index) {
    const bookContainer = document.querySelector('#books-container');
    const bookHTML = this.getBookHTML(book, index);
    bookContainer.appendChild(bookHTML);
  }

  getBookHTML(book, i) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.dataset.key = i;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove--book--button');
    removeButton.textContent = '✕';
    removeButton.addEventListener('click', (e) => this.handleRemoveBook(e, i));
    bookDiv.appendChild(removeButton);

    const title = document.createElement('p');
    title.classList.add('book--title');
    title.textContent = book.title;
    bookDiv.appendChild(title);

    const author = document.createElement('p');
    author.classList.add('book--author');
    author.textContent = book.author;
    bookDiv.appendChild(author);

    const pages = document.createElement('p');
    pages.classList.add('book--pages');
    pages.textContent = book.pages + ' pages';
    bookDiv.appendChild(pages);

    const readButton = document.createElement('button');
    readButton.classList.add('book--read--button');
    if (book.isRead) {
      readButton.classList.add('read');
      readButton.textContent = 'Read';
    } else {
      readButton.classList.add('notread');
      readButton.textContent = 'Not read';
    }
    readButton.addEventListener('click', (e) => this.handleUpdateReadStatus(e, i));

    bookDiv.appendChild(readButton);

    return bookDiv;
  }

  handleNewBookClick(e) {
    const form = document.querySelector('#add-book-form');
    form.style.display = 'flex';
  }

  handleCloseFormClick(e) {
    const form = document.querySelector('#add-book-form');
    form.style.display = 'none';
  }

  handleAddBook(e) {
    e.preventDefault();

    const form = document.querySelector('#add-book-form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const isRead = formData.get('isRead') ? true : false;

    const book = new Book(title, author, pages, isRead);

    this.library.addBook(book);
    this.update(this.library.books);
  }

  handleRemoveBook(e, i) {
    this.library.removeBook(i);
    this.update(this.library.books);
  }

  handleUpdateReadStatus(e, i) {
    this.library.books[i].changeReadStatus();
    this.update(this.library.books);
  }
}

export default UI;
