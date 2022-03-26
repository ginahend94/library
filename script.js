// MODAL
const wrapper = document.querySelector('.wrapper');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');
const form = document.querySelector('form');
const formCancel = form.querySelector('a');
const addBookButton = form.querySelector('button');
const newBookButton = document.querySelector('.new-book');
const deleteLibraryButton = document.querySelector('.delete-library')

newBookButton.addEventListener('click', () => modal.style.display = 'flex');

addBookButton.addEventListener('click', () => {
	console.log('ye')
})

formCancel.addEventListener('click', () => modal.style.display = 'none');
wrapper.querySelector('button').addEventListener('click', () => modal.style.display = 'flex');

modalBg.addEventListener('click', e => {
    modal.style.display = 'none';
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
		return `${this.title} by ${this.author}, ${pages} pages, ${
			haveRead ? "read" : "not read yet"
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
	inputs.forEach(input => input.checked == true ? input.checked = false: null);
}
// book is added on-screen
function displayBooks() {
	library.forEach(book => {
		// Check if book is already on page
		//if (Array.from(table.rows).some(row => row.dataset.id == book.id)) return;
		
		const tableInner = document.getElementById('table-inner');
		tableInner.innerHTML = '';
		const newBook = document.createElement('tr');
		const newBookTitle = document.createElement('td');
		newBookTitle.textContent = book.title;
		const newBookAuthor = document.createElement('td');
		newBookAuthor.textContent = book.author;
		const newBookPages = document.createElement('td');
		newBookPages.textContent = book.pages;
		const newBookRead = document.createElement('td');
		newBookRead.textContent = book.haveRead ? 'Yes' : 'No';
		const toggleRead = document.createElement('input');
		toggleRead.type = 'checkbox';
		toggleRead.classList.add('toggle-read');
		newBookRead.appendChild(toggleRead);
		const editBook = document.createElement('td');
		const editBookButton = document.createElement('button');
		editBookButton.classList.add('edit-book-button');
		editBookButton.innerHTML = `Edit`;
		editBook.appendChild(editBookButton);
		const deleteBook = document.createElement('td');
		const deleteBookButton = document.createElement('button');
		deleteBookButton.classList.add('delete-book-button');
		deleteBookButton.innerHTML = `&#215;`;
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
