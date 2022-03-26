// MODAL
const wrapper = document.querySelector('.wrapper');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');
const form = document.querySelector('form');
const formCancel = form.querySelector('a');
const addBookButton = form.querySelector('button');

const hideModal = () => modal.style.display = 'none';

const newBookButton = document.querySelector('.new-book');
const deleteLibraryButton = document.querySelector('.delete-library')

newBookButton.addEventListener('click', () => modal.style.display = 'flex');
deleteLibraryButton.addEventListener('click', deleteLibrary);

formCancel.addEventListener('click', () => {
    hideModal();
    clearInputs();
});
wrapper.querySelector('button').addEventListener('click', () => modal.style.display = 'flex');

modalBg.addEventListener('click', e => {
    hideModal();
})

// Display what's already in library on screen
const table = document.querySelector('table');
let library = !localStorage['library'] ? [] : JSON.parse(localStorage.getItem('library'));
displayBooks();

// Enter book info
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

// Press 'add'
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
    displayBooks();
});

function Book(title, author, pages, haveRead) {
    this.id = randomID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${pages} pages, ${haveRead ? "read" : "not read yet"
            }`;
    };
}

const randomID = () => Math.floor(Math.random() * Date.now());

// new Book object is created and added to library

const createBook = () => new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
const addBook = () => {
    library.push(createBook());
    localStorage.setItem('library', JSON.stringify(library));
    console.log(library);
    clearInputs();
}
// inputs are cleared
function clearInputs() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.value = null);
    inputs.forEach(input => input.checked == true ? input.checked = false : null);
}
// book is added on-screen
function displayBooks() {

    // Clear table
    const tableInner = document.getElementById('table-inner');
    tableInner.innerHTML = '';

    if (!library.length) {
        const emptyMessageRow = document.createElement('tr');
        const emptyMessageCell = document.createElement('td');
        emptyMessageRow.appendChild(emptyMessageCell);
        emptyMessageCell.colSpan = 6;
        emptyMessageCell.classList.add('no-books');
        emptyMessageCell.textContent = 'Click below to add a book to your library.'
        tableInner.appendChild(emptyMessageRow);
    }

    library.forEach(book => {
        const newBook = document.createElement('tr');
        const newBookTitle = document.createElement('td');
        newBookTitle.textContent = book.title;
        newBookTitle.classList.add('title');
        const newBookAuthor = document.createElement('td');
        newBookAuthor.textContent = book.author;
        newBookAuthor.classList.add('author');
        const newBookPages = document.createElement('td');
        newBookPages.textContent = book.pages;
        newBookPages.classList.add('pages');
        const newBookRead = document.createElement('td');
        newBookRead.classList.add('read');
        const newBookReadSpan = document.createElement('span');
        newBookReadSpan.classList.add('read-status');
        newBookReadSpan.textContent = book.haveRead ? 'Yes' : 'No';
        newBookRead.appendChild(newBookReadSpan);
        const toggleRead = document.createElement('input');
        toggleRead.type = 'checkbox';
        toggleRead.classList.add('toggle-read');
        toggleRead.checked = book.haveRead;
        newBookRead.appendChild(toggleRead);
        const editBook = document.createElement('td');
        editBook.classList.add('edit');
        const editBookButton = document.createElement('button');
        editBookButton.classList.add('edit-book-button');
        editBookButton.innerHTML = `Edit`;
        editBookButton.dataset.id = book.id;
        editBook.appendChild(editBookButton);
        const deleteBook = document.createElement('td');
        deleteBook.classList.add('delete');
        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add('delete-book-button');
        deleteBookButton.textContent = 'Delete';
        deleteBookButton.dataset.id = book.id;
        deleteBook.appendChild(deleteBookButton);

        newBook.appendChild(newBookTitle);
        newBook.appendChild(newBookAuthor);
        newBook.appendChild(newBookPages);
        newBook.appendChild(newBookRead);
        newBook.appendChild(editBook);
        newBook.appendChild(deleteBook);
        newBook.dataset.id = book.id;

        tableInner.appendChild(newBook);
    })
}

// Custom alert
const alert = document.querySelector('.alert');
const alertBG = document.querySelector('.alert-bg');
const alertMessage = document.getElementById('alert-text');
const okButton = document.querySelector('.confirm');
const cancelButton = document.querySelector('.cancel');

const hideAlert = () => alert.style.display = 'none';

alertBG.addEventListener('click', () => {
    hideAlert();
})

cancelButton.addEventListener('click', () => {
    hideAlert();
})

function confirmAction(message, callback, showCancel) {
    alert.style.display = 'flex';
    alertMessage.textContent = message;
    okButton.onclick = callback;
    showCancel ? cancelButton.style.display = 'inline-block' : cancelButton.style.display = 'none';
}

function updateLibrary() {
    displayBooks();
    localStorage.setItem('library', JSON.stringify(library));
}

// Delete library
function deleteLibrary() {
    // Cancel if library is already empty
    if (!library.length) return confirmAction('You have no books to delete.', hideAlert, false);

    //Show warning
    confirmAction('Are you sure you want to delete your entire library? This cannot be undone.',
        () => {
            library = [];
            updateLibrary();
            hideAlert();
            confirmAction('Library deleted.', hideAlert, false);
        },
        true);
}

// Edit book
// Pull up form
// Add book button now says save
// Populate form with object data
// On save, find row matching object id

// Delete book

const deleteBookButtonArray = Array.from(document.querySelectorAll('.delete-book-button'));
deleteBookButtonArray.forEach(deleteButton => {
    deleteButton.addEventListener('click', deleteBook.bind(deleteButton, deleteButton.dataset.id));
})

function deleteBook(bookId) {
    const bookTitle = document.getElementById('table-inner')
        .querySelector(`[data-id='${bookId}']`)
        .querySelector('.title').textContent;
    confirmAction(`Are you sure you want to delete ${bookTitle}? This cannot be undone.`,
        () => {
            library = library.filter(object => {
                console.log(bookId);
                console.log(object.id);
                console.log(object.id !== bookId);
                object.id !== bookId;
            });
            updateLibrary();
            hideAlert();
            console.log(library);
        },
        true)
}

// Dummy Books
function fillLibrary(bookNumber = 5) {
    const randomize = array => array[randomNum(array.length)];
    const randomNum = (limit = 1000) => Math.floor(Math.random() * limit);
    const words = [
        'Poet',
        'Employment',
        'Dirt',
        'Two',
        'Student',
        'Hearing',
        'Situation',
        'Opportunity',
        'Agreement',
        'Attitude',
        'Appointment',
        'Accident',
        'Emphasis',
        'Nature',
        'Disk',
        'Conclusion',
        'Disease',
        'Dad',
        'Income',
        'Cell',
        'Health',
        'Camera',
        'Computer',
        'Finding',
        'Magazine',
        'Wife',
        'Pizza',
        'Strategy',
        'Investment',
        'Wood',
        'Diamond',
        'Psychology',
        'Editor',
        'Union',
        'Language',
        'Priority',
        'Cousin',
        'Shirt',
        'Communication',
        'Foundation',
    ];
    const middles = ['of', 'and the', 'for', 'or'];
    const names = [
        'Minnie Mosley',
        'Raihan Baird',
        'Milly Andrade',
        'Rocky Norman',
        'Gabriel Joseph',
        'Kiya Pike',
        'Zidane Hooper',
        'Cayson Owen',
        'Mohammed Whitworth',
        'Morgan Marshall',
        'Elara Sparrow',
        'Hester Horner',
        'Geoffrey Broadhurst',
        'Kaitlin Nguyen',
        'Tori Sierra',
        'Shaunna Delaney',
        'Neel Braun',
        'Nikkita Howarth',
        'Avery Gamble',
        'Jennifer Compton',
    ]
    const starts = ['', 'The', 'A', 'My', 'Her'];
    for (let i = 0; i < bookNumber; i++) {
        library.push(new Book(`${randomize(starts)} ${randomize(words)} ${randomize(middles)} ${randomize(words)}`,
            randomize(names),
            randomNum(),
            randomNum(2)));
        updateLibrary();
    }
}