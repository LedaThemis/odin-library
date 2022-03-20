let library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  library.push(book);
}

function displayBooks() {
  const booksContainer = document.querySelector("#books-container");
  booksContainer.replaceChildren();

  library.forEach((b) => appendBookToContainer(b));
}

function appendBookToContainer(b) {
  const bookContainer = document.querySelector("#books-container");
  bookContainer.appendChild(getBookHTML(b));
}

function getBookHTML(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove--book--button");
  removeButton.textContent = "✕";
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
  pages.textContent = book.pages;
  bookDiv.appendChild(pages);

  const readButton = document.createElement("button");
  readButton.classList.add("book--read--button");
  book.isRead
    ? readButton.classList.add("read")
    : readButton.classList.add("notread");
  readButton.textContent = "Read";
  bookDiv.appendChild(readButton);

  return bookDiv;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", "265", true);

displayBooks();
