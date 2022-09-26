let myLibrary = [];
const DOMLibrary = document.querySelector('.library');

class Book {
    constructor(title, author, pages, isRead, key) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = isRead;
        this.key = key
    }
}

const addBookToLibrary = (title, author, pages, isRead, key) => {
    myLibrary.push(new Book(title, author, pages, isRead, key));
}

addBookToLibrary('LOTR', 'J.R.R. Tolkien', 295, false, 0);
addBookToLibrary('Game of Thrones', 'George R.R. Martin', 295, false, 1);
addBookToLibrary('Harry Potter', 'J.K. Rowling', 295, true, 2);
addBookToLibrary('Famous Five', 'Enid Blyton', 295, true, 3);

const createNewCard = (title, author, pages, isRead, key) => {
    const newCard = document.createElement('div');
    newCard.classList.add('book-card');

    const bookInfo = document.createElement('ul');
    bookInfo.appendChild(document.createElement('li')).innerText = `Title: ${title}`;
    bookInfo.appendChild(document.createElement('li')).innerText = `Author: ${author}`;
    bookInfo.appendChild(document.createElement('li')).innerText = `Number of pages: ${pages}`;
    bookInfo.appendChild(document.createElement('li')).innerText = `Read status: ${isRead ? 'read' : 'not yet'}`;

    let removeButton = document.createElement('button');
    removeButton.innerText = 'Remove book'
    removeButton.classList.add('remove-btn');

    let readStatusBtn = document.createElement('button');
    readStatusBtn.innerText = 'Change read status';
    readStatusBtn.classList.add('read-status-btn');

    newCard.appendChild(bookInfo);
    newCard.appendChild(removeButton);
    newCard.appendChild(readStatusBtn);
    newCard.setAttribute('data-key', key);

    return newCard;
}

function displayBooks(arr) {
    arr.forEach(book => {
        console.log('here');
        DOMLibrary.appendChild(createNewCard(book.title, book.author, book.pages, book.read, book.key));
    })
}

function updateBooks(arr) {
    let lastChild = DOMLibrary.lastChild;
    while(lastChild) {
        DOMLibrary.removeChild(lastChild);
        lastChild = DOMLibrary.lastChild;
    }

    displayBooks(arr);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => removeBook(e))
    })

    document.querySelectorAll('.read-status-btn').forEach(btn => {
        btn.addEventListener('click', e => changeReadStatus(e))
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

    addBookToLibrary(title.value, author.value, pages.value, isRead, key)
    updateBooks(myLibrary);

    title.value = '';
    author.value = '';
    pages.value = '';
    document.querySelector('form').classList.add('hidden');
})

document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => removeBook(e))
})

document.querySelectorAll('.read-status-btn').forEach(btn => {
    btn.addEventListener('click', e => changeReadStatus(e))
})

displayBooks(myLibrary);
