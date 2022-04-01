class Book {
  constructor(title, author, pages, isRead) {
    this.title = title === "" ? "Unknown" : title;
    this.author = author === "" ? "Unknown" : author;
    this.pages = pages === "" ? "Unknown" : pages;
    this.isRead = isRead;
  }

  changeReadStatus() {
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    ui.update(this.books)
  }

  handleRemoveBook(e, i) {
    this.books = removeAtIndex(this.books, i);
    ui.update(this.books);
  }
}

class UI {
  constructor() {
    
  }

  update(books) {
    const booksContainer = document.querySelector("#books-container");
    booksContainer.replaceChildren();
  
    books.forEach((book, index) => this.appendBook(book, index));
  }

  appendBook(book, index) {
    const bookContainer = document.querySelector("#books-container");
    const bookHTML = this.getBookHTML(book, index);
    bookContainer.appendChild(bookHTML);
  }

  getBookHTML(book, i) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.dataset.key = i;
  
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove--book--button");
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", (e) => library.handleRemoveBook(e, i));
    bookDiv.appendChild(removeButton);
  
    const title = document.createElement("p");
    title.classList.add("book--title");
    title.textContent = book.title;
    bookDiv.appendChild(title);
  
    const author = document.createElement("p");
    author.classList.add("book--author");
    author.textContent = book.author;
    bookDiv.appendChild(author);
  
    const pages = document.createElement("p");
    pages.classList.add("book--pages");
    pages.textContent = book.pages + " pages";
    bookDiv.appendChild(pages);
  
    const readButton = document.createElement("button");
    readButton.classList.add("book--read--button");
    if (book.isRead) {
      readButton.classList.add("read");
      readButton.textContent = "Read";
    } else {
      readButton.classList.add("notread");
      readButton.textContent = "Not read";
    }
    readButton.addEventListener("click", (e) => ui.handleUpdateReadStatus(e, i));
    bookDiv.appendChild(readButton);
  
    return bookDiv;
  }

  handleNewBookClick(e) {
    const form = document.querySelector("#add-book-form");
    form.style.display = "flex";
  }

  handleCloseFormClick(e) {
    const form = document.querySelector("#add-book-form");
    form.style.display = "none";
  }
  
  handleAddBook(e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#add-book-form"));
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const isRead = formData.get("isRead") ? true : false;
  
    const book = new Book(title, author, pages, isRead);
  
    library.addBook(book);
  }

  handleUpdateReadStatus(e, i) {
    library.books[i].changeReadStatus();
    ui.update(library.books);
  }
}


const library = new Library();
const ui = new UI();


const newBookButton = document.querySelector("#add-new-book");
newBookButton.addEventListener("click", ui.handleNewBookClick);

const closeFormButton = document.querySelector("#close--form--button");
closeFormButton.addEventListener("click", ui.handleCloseFormClick);

const addBook = document.querySelector("#add-book");
addBook.addEventListener("click", ui.handleAddBook);


// HELPER FUNCTIONS

function removeAtIndex(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i + 1));
}
