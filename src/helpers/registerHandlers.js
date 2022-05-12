const registerHandlers = (ui) => {
  const newBookButton = document.querySelector('#add-new-book');
  const closeFormButton = document.querySelector('#close--form--button');
  const addBook = document.querySelector('#add-book');

  newBookButton.addEventListener('click', ui.handleNewBookClick);
  closeFormButton.addEventListener('click', ui.handleCloseFormClick);
  addBook.addEventListener('click', (e) => ui.handleAddBook(e));
};

export default registerHandlers;
