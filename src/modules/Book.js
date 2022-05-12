class Book {
  constructor(title, author, pages, isRead) {
    this.title = title === '' ? 'Unknown' : title;
    this.author = author === '' ? 'Unknown' : author;
    this.pages = pages === '' ? 'Unknown' : pages;
    this.isRead = isRead;
  }

  changeReadStatus() {
    this.isRead = !this.isRead;
  }
}

export default Book;
