// Modal
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');
const form = document.querySelector('form');
const formCancel = document.querySelector('.form-cancel');
let addBookButton = document.querySelector('#add-book-button');

const hideModal = modal => modal.style.display = 'none';
const showModal = modal => modal.style.display = 'flex';

formCancel.addEventListener('click', () => {
    hideModal(modal);
    clearInputs();
});
modalBg.addEventListener('click', hideModal.bind(modalBg, modal));

const newBookButton = document.querySelector('.new-book');
const editLibraryButton = document.querySelector('.edit-library');
const deleteLibraryButton = document.querySelector('.delete-library');
const fillLibraryButton = document.querySelector('.dummy-books');
const duplicateBookButton = document.querySelector('.duplicate-book');

newBookButton.addEventListener('click', () => {
    duplicateBookButton.style.display = 'none';
    // Remove event listeners
    let oldAddButton = addBookButton;
    addBookButton = addBookButton.cloneNode(true);
    oldAddButton.replaceWith(addBookButton);
    addBookButton.addEventListener('click', addBookToLibrary);
    addBookButton.textContent = 'Add new book';
    showModal(modal);
    clearInputs();
});
editLibraryButton.addEventListener('click', editLibrary);
deleteLibraryButton.addEventListener('click', deleteLibrary);
fillLibraryButton.addEventListener('click', fillLibrary.bind(fillLibraryButton, 5));



// Display what's already in library on screen
const table = document.querySelector('table');
let library = !localStorage['library'] ? [] : JSON.parse(localStorage.getItem('library'));
updateLibrary();

// Grab book info
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

form.addEventListener("submit", e => e.preventDefault());

function Book(title, author, pages, haveRead) {
    this.id = randomID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead ? "read" : "not read yet"
        }`;
};

const randomID = () => Math.floor(Math.random() * Date.now());

// Create new Book object and add to library
const createBook = () => {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    newBook.prototype = Object.create(Book.prototype);
    return newBook;
}
const addBookToLibrary = () => {
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        return confirmAction('All fields are required.', hideAlert, false)
    }
    library.push(createBook());
    updateLibrary();
    clearInputs();
}
// inputs are cleared
function clearInputs() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.type == 'checkbox' ? input.checked = false : input.value = null);
}
// book is added on-screen
function displayBooks() {

    // Clear table
    const tableInner = document.getElementById('table-inner');
    tableInner.innerHTML = '';

    // Display a message if there are no books in library
    if (!library.length) {
        const emptyMessageRow = document.createElement('tr');
        const emptyMessageCell = document.createElement('td');
        emptyMessageRow.appendChild(emptyMessageCell);
        emptyMessageCell.colSpan = 6;
        emptyMessageCell.classList.add('no-books');
        emptyMessageCell.textContent = 'Click below to add a book to your library.'
        tableInner.appendChild(emptyMessageRow);
    }

    // Create and append a row for each book
    library.forEach(book => {
        const newBook = document.createElement('tr');
        tableInner.appendChild(newBook);
        newBook.dataset.id = book.id;

        // Title
        const newBookTitle = document.createElement('td');
        newBook.appendChild(newBookTitle);
        newBookTitle.textContent = book.title;
        newBookTitle.classList.add('title');

        // Author
        const newBookAuthor = document.createElement('td');
        newBook.appendChild(newBookAuthor);
        newBookAuthor.textContent = book.author;
        newBookAuthor.classList.add('author');

        // Pages
        const newBookPages = document.createElement('td');
        newBook.appendChild(newBookPages);
        newBookPages.textContent = book.pages;
        newBookPages.classList.add('pages');

        // Read status
        const newBookRead = document.createElement('td');
        newBook.appendChild(newBookRead);
        newBookRead.classList.add('read');

        const newBookReadLabel = document.createElement('label');
        newBookRead.appendChild(newBookReadLabel);
        newBookReadLabel.classList.add('read-status');

        const toggleRead = document.createElement('input');
        newBookReadLabel.appendChild(toggleRead);
        toggleRead.type = 'checkbox';
        toggleRead.classList.add('toggle-read');
        toggleRead.checked = !!book.haveRead;
        toggleRead.dataset.id = book.id;

        const yes = document.createElement('span');
        newBookReadLabel.appendChild(yes);
        yes.classList.add('yes');
        yes.textContent = 'Yes';

        const checkmark = document.createElement('span');
        newBookReadLabel.appendChild(checkmark);
        checkmark.classList.add('checkmark');
        checkmark.textContent = !!book.haveRead ? '✓' : '✖';

        const no = document.createElement('span');
        newBookReadLabel.appendChild(no);
        no.classList.add('no');
        no.textContent = 'No';

        // Edit
        const editBook = document.createElement('td');
        newBook.appendChild(editBook);
        editBook.classList.add('edit');

        const editBookButton = document.createElement('button');
        editBook.appendChild(editBookButton);
        editBookButton.classList.add('edit-book-button');
        editBookButton.innerHTML = `Edit`;
        editBookButton.dataset.id = book.id;

        // Delete
        const deleteBook = document.createElement('td');
        newBook.appendChild(deleteBook);
        deleteBook.classList.add('delete');

        const deleteBookButton = document.createElement('button');
        deleteBook.appendChild(deleteBookButton);
        deleteBookButton.classList.add('delete-book-button');
        deleteBookButton.textContent = 'Delete';
        deleteBookButton.dataset.id = book.id;
    })
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
    const middles = [
        'of',
        'and the',
        'for',
        'or',
        'of the',
    ];
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
    const starts = [
        '',
        'The',
        'A',
        'My',
        'Her',
    ];
    for (let i = 0; i < bookNumber; i++) {
        library.push(new Book(
            `${randomize(starts)} ${randomize(words)} ${randomize(middles)} ${randomize(words)}`, // Generate random title
            randomize(names), // Pick random author
            randomNum(), // Random number of pages
            !!randomNum(2)) // True/False read status
        );
        updateLibrary();
    }
}

// Custom alert
const alert = document.querySelector('.alert');
const alertBG = document.querySelector('.alert-bg');
const alertMessage = document.getElementById('alert-text');
const alertOkButton = document.querySelector('.confirm');
const alertCancelButton = alert.querySelector('.cancel');

const hideAlert = () => hideModal(alert);

alertBG.addEventListener('click', hideAlert)

alertCancelButton.addEventListener('click', hideAlert);

function confirmAction(message, callback, showCancel) {
    showModal(alert);
    alertMessage.textContent = message;
    alertOkButton.onclick = callback;
    showCancel ? alertCancelButton.style.display = 'inline-block' : alertCancelButton.style.display = 'none';
}

function updateLibrary() {
    displayBooks();
    localStorage.setItem('library', JSON.stringify(library));
    if (library.length) addEventListeners();
}

// Add event listeners to buttons
function addEventListeners() {
    const deleteBookButtons = document.querySelectorAll('.delete-book-button');
    deleteBookButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', e => {
            changeBook(e, deleteButton.dataset.id, 'delete');
        });
    })

    const readStatusToggles = document.querySelectorAll('.toggle-read');
    readStatusToggles.forEach(toggle => {
        toggle.addEventListener('change', e => {
            changeBook(e, toggle.dataset.id, 'read');
        });
    })

    const editBookButtons = document.querySelectorAll('.edit-book-button');
    editBookButtons.forEach(button => {
        button.addEventListener('click', e => {
            changeBook(e, button.dataset.id, 'edit');
        });
    })
}

// Delete library
function deleteLibrary() {
    // Cancel if library is already empty
    if (!library.length) return confirmAction('You have no books to delete.', hideAlert, false);

    //Show warning
    confirmAction('Are you sure you want to delete your entire library? \nThis cannot be undone.',
        () => {
            library = [];
            updateLibrary();
            hideAlert();
            confirmAction('Library deleted.', hideAlert, false);
        },
        true);
}

// Edit library (select multiple books to delete)
const editLibraryModal = document.querySelector('.edit-library-modal');
const editLibraryBg = document.querySelector('.edit-library-modal-bg');
const editLibraryBookList = document.querySelector('.book-list');
const editLibraryDeleteButton = document.querySelector('.delete-books');
const editLibraryCancelButton = editLibraryModal.querySelector('.cancel');

editLibraryBg.addEventListener('click', hideModal.bind(editLibraryBg, editLibraryModal));

function editLibrary() {
    // Cancel if library is already empty
    if (!library.length) return confirmAction('You have no books to delete.', hideAlert, false);

    let toBeDeleted = [];
    editLibraryBookList.innerHTML = '';
    showModal(editLibraryModal);
    editLibraryDeleteButton.addEventListener('click', deleteSelected);
    disableDeleteButton();

    const libraryTitles = () => {
        const libraryTitlesContainer = document.createElement('ul');
        libraryTitlesContainer.classList.add('book-list-container');
        library.forEach(book => {
            // Add checkboxes before titles
            libraryTitlesContainer.innerHTML += `<li><label><input class="to-delete" type="checkbox" value='${book.id}'><span class="custom-check"></span> ${book.title} <span class="by">by</span> ${book.author}</label></li>`;
        })
        return libraryTitlesContainer;
    }
    editLibraryBookList.appendChild(libraryTitles());

    const editCheckboxes = document.querySelectorAll('.to-delete');
    editCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', addBookForDeletion.bind(checkbox, checkbox.value));
    })

    // Inputs correspond to books in library
    function addBookForDeletion(bookId) {
        if (this.checked) {
            toBeDeleted.push(bookId);
        }
        else {
            toBeDeleted = toBeDeleted.filter(a => a !== bookId);
        }
        // delete button is grayed out until at least one book is selected
        if (toBeDeleted.length) {
            editLibraryDeleteButton.disabled = false;
            editLibraryDeleteButton.textContent = `Delete ${toBeDeleted.length} Book${toBeDeleted.length > 1 ? 's' : ''}`;
        } else disableDeleteButton();
    }

    function disableDeleteButton() {
        editLibraryDeleteButton.textContent = 'No books selected';
        editLibraryDeleteButton.disabled = true;
    }
    function deleteSelected() {
        // box pops up: delete the following: lists books
        const toBeDeletedTitles = () => {
            let titles = [];
            toBeDeleted.forEach(id => {
                let book = library.find(book => book.id == id);
                titles.push(`'${book.title}' by ${book.author}`);
            })
            return titles;
        }
        // 'yes' deletes books, cancel sends back
        confirmAction(
            `Are you sure you want to delete the following: \n\n${toBeDeletedTitles().join('\n')}\n\nThis cannot be undone.`,
            () => {
                toBeDeleted.forEach(selection => {
                    library = library.filter(book => book.id != selection);
                })
                updateLibrary();
                hideAlert();
                hideModal(editLibraryModal);
            },
            true
        )
    }
}

// Change book

function changeBook(e, bookId, change) {
    // Find book in library
    const book = library.find(a => a.id == bookId);
    const target = e.target;
    
    // Edit book
    function editBook(book) {
        // Populate form with object data
        titleInput.value = book.title;
        authorInput.value = book.author;
        pagesInput.value = book.pages;
        readInput.checked = book.haveRead;
        
        // On save, find row matching object id
        const saveChanges = book => {
            book.title = titleInput.value;
            book.author = authorInput.value;
            book.pages = pagesInput.value;
            book.haveRead = readInput.checked;
            hideModal(modal);
            clearInputs();
            updateLibrary();
        }

        // Remove event listeners
        let oldAddButton = addBookButton;
        addBookButton = addBookButton.cloneNode(true);
        oldAddButton.replaceWith(addBookButton);
        
        // Duplicate book
        duplicateBookButton.addEventListener('click', duplicate);
        duplicateBookButton.style.display = 'inline-block';
        function duplicate() {
            // create new book, params are book props
            const dupe = new Book(book.title, book.author, book.pages, book.haveRead);
            // update library
            library.push(dupe);
            updateLibrary();
            // close modal
            hideModal(modal);
        }

        // Pull up form
        showModal(modal);

        // Add book button is now save button
        addBookButton.addEventListener('click', saveChanges.bind(addBookButton, book))
        addBookButton.textContent = 'Save changes';
    }

    // Delete book
    function deleteBook(book) {
        confirmAction(`Are you sure you want to delete '${book.title}'? \nThis cannot be undone.`,
            () => {
                library = library.filter(object => object != book);
                updateLibrary();
                hideAlert();
            },
            true)
    }

    // Toggle Read status
    function changeReadStatus(book) {
        // Update read status to check status
        book.haveRead = !!target.checked; // haveRead might be boolean or 0/1
        // Update library
        updateLibrary();
    }

    switch (change) {
        case 'edit':
            editBook(book);
            break;
        case 'delete':
            deleteBook(book);
            break;
        case 'read':
            changeReadStatus(book);
            break;
        default:
            console.log(`Book: ${bookTitle}`);
            break;
    }
}

// Dark mode
// header, footer, sidebar
// sorting function
// batch add
