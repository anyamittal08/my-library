myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = isRead;

        this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
        };
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(arr) {
    arr.forEach(book => {
        let newBookCard = document.createElement('div');
        newBookCard.classList.add('book-card');
        let bookInfo = document.createElement('ul');
        bookInfo.appendChild(document.createElement('li')).innerText = `Name: ${book.title}`;
        bookInfo.appendChild(document.createElement('li')).innerText = `Author: ${book.author}`;
        bookInfo.appendChild(document.createElement('li')).innerText = `Number of pages: ${book.pages}`;
        bookInfo.appendChild(document.createElement('li')).innerText = `Read Status: ${book.read ? 'read' : 'not yet'}`;

        newBookCard.appendChild(bookInfo);

        document.querySelector('.library').appendChild(newBookCard);
    })
}

addBookToLibrary(new Book('LOTR', 'J.R.R. Tolkien', 295, false));
addBookToLibrary(new Book('Game of Thrones', 'George R.R. Martin', 295, false));
addBookToLibrary(new Book('Harry Potter', 'J.K. Rowling', 295, true));
addBookToLibrary(new Book('Famous Five', 'Enid Blyton', 295, true));

console.log(myLibrary);

displayBooks(myLibrary);

