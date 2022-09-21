myLibrary = [];

class Book {
    constructor(title, author, pages, isRead, key) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = isRead;
        this.key = key
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(arr) {
    arr.forEach(book => {
        let newBookCard = document.createElement('div');
        newBookCard.classList.add('book-card');
        let index = myLibrary.indexOf(book);

        let bookInfo = document.createElement('ul');
        bookInfo.appendChild(document.createElement('li')).innerText = `Name: ${book.title}`;
        bookInfo.appendChild(document.createElement('li')).innerText = `Author: ${book.author}`;
        bookInfo.appendChild(document.createElement('li')).innerText = `Number of pages: ${book.pages}`;
        bookInfo.appendChild(document.createElement('li')).innerText = `Read Status: ${book.read ? 'read' : 'not yet'}`;

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove book'
        removeButton.classList.add('remove-btn');

        let readStatusBtn = document.createElement('button');
        readStatusBtn.innerText = 'Change read status';
        readStatusBtn.classList.add('read-status-btn');

        newBookCard.appendChild(bookInfo);
        newBookCard.appendChild(removeButton);
        newBookCard.appendChild(readStatusBtn);
        newBookCard.setAttribute('data-key', index);
        

        document.querySelector('.library').appendChild(newBookCard);
    })
}

function updateBooks(arr) {
    let lastChild = document.querySelector('.library').lastChild;
    while(lastChild) {
        document.querySelector('.library').removeChild(lastChild);
        lastChild = document.querySelector('.library').lastChild;
    }

    displayBooks(arr);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => removeBook(e))
    })
}

function removeBook(e) {
    let cardToBeRemoved = e.target.parentNode;
    let indexToBeRemoved = cardToBeRemoved.dataset.key;
    myLibrary.splice(indexToBeRemoved, 1);
    updateBooks(myLibrary);
}

function changeReadStatus(e) {
    let parent = e.target.parentNode;
    let index = parent.dataset.key;
    let book = myLibrary[index];
    book.read = book.read ? false : true;

   parent.querySelectorAll('li')[3].innerText = parent.querySelectorAll('li')[3].innerText === 'Read status: read' ? 'Read status: not yet read' : 'Read status: read';
    
    console.log(myLibrary)
}

document.querySelector('.add-btn').addEventListener('click', () => {
    document.querySelector('form').classList.toggle('hidden');
})

document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const pages = document.getElementById('book-pages');
    const selectionInput = document.getElementById('book-read-status');
    const isRead = selectionInput.options[selectionInput.selectedIndex].value === 'yes' ? true : false;

    const key = myLibrary.length

    const newBook = new Book(title.value, author.value, pages.value, isRead, key);
    myLibrary.push(newBook);
    updateBooks(myLibrary);

    title.value = '';
    author.value = '';
    pages.value = '';
    document.querySelector('form').classList.add('hidden');
})

addBookToLibrary(new Book('LOTR', 'J.R.R. Tolkien', 295, false, 0));
addBookToLibrary(new Book('Game of Thrones', 'George R.R. Martin', 295, false, 1));
addBookToLibrary(new Book('Harry Potter', 'J.K. Rowling', 295, true, 3));
addBookToLibrary(new Book('Famous Five', 'Enid Blyton', 295, true, 3));

console.log(myLibrary);

displayBooks(myLibrary);

document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => removeBook(e))
})

document.querySelectorAll('.read-status-btn').forEach(btn => {
    btn.addEventListener('click', e => changeReadStatus(e))
})
