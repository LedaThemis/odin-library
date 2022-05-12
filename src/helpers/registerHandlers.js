const registerHandlers = (ui) => {
  const newBookButton = document.querySelector('#add-new-book');
  newBookButton.addEventListener('click', ui.handleNewBookClick);

  const closeFormButton = document.querySelector('#close--form--button');
  closeFormButton.addEventListener('click', ui.handleCloseFormClick);

  const addBook = document.querySelector('#add-book');
  addBook.addEventListener('click', (e) => ui.handleAddBook(e));
};

export default registerHandlers;
