let library = [];

function Book(title, author, pages, isRead) {
  this.title = title === "" ? "Unknown" : title;
  this.author = author === "" ? "Unknown" : author;
  this.pages = pages === "" ? "Unknown" : pages;
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

  library.forEach((b, i) => appendBookToContainer(b, i));
}

function appendBookToContainer(b, i) {
  const bookContainer = document.querySelector("#books-container");
  const bookHTML = getBookHTML(b, i);
  bookContainer.appendChild(bookHTML);
}

function getBookHTML(book, i) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.key = i;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove--book--button");
  removeButton.textContent = "✕";
  removeButton.addEventListener("click", (e) => handleRemoveBook(e, i));
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
  book.isRead
    ? readButton.classList.add("read")
    : readButton.classList.add("notread");
  readButton.textContent = "Read";
  readButton.addEventListener("click", (e) => handleUpdateReadStatus(e, i));
  bookDiv.appendChild(readButton);

  return bookDiv;
}

// NEW BOOK
const newBookButton = document.querySelector("#add-new-book");

newBookButton.addEventListener("click", handleNewBookClick);

function handleNewBookClick(e) {
  const form = document.querySelector("#add-book-form");
  form.style.display = "flex";
}

// CLOSE FORM BUTTON
const closeFormButton = document.querySelector("#close--form--button");
closeFormButton.addEventListener("click", handleCloseFormClick);

function handleCloseFormClick(e) {
  const form = document.querySelector("#add-book-form");
  form.style.display = "none";
}

// SUBMIT FORM
const addBook = document.querySelector("#add-book");
addBook.addEventListener("click", handleAddBook);

function handleAddBook(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#add-book-form"));
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const isRead = formData.get("isRead") ? true : false;

  const book = new Book(title, author, pages, isRead);

  addBookToLibrary(book);
  displayBooks();
}

// REMOVE BOOK
function handleRemoveBook(e, i) {
  library = removeAtIndex(library, i);
  displayBooks();
}

function removeAtIndex(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i + 1));
}

// HANDLE UPDATE READ STATUS
function handleUpdateReadStatus(e, i) {
  library[i].changeReadStatus();
  displayBooks();
}

const theHobbit1 = new Book("The Hobbit1", "J.R.R. Tolkein", "265", true);
const theHobbit2 = new Book("The Hobbit2", "J.R.R. Tolkein", "265", true);
const theHobbit3 = new Book("The Hobbit3", "J.R.R. Tolkein", "265", true);
addBookToLibrary(theHobbit1);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit3);
displayBooks();
