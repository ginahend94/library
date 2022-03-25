// MODAL
const wrapper = document.querySelector('.wrapper');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');
const form = document.querySelector('form');
const formCancel = form.querySelector('a');
const newBookButton = form.querySelector('button');

newBookButton.addEventListener('click', () => {
	console.log('ye')
})

formCancel.addEventListener('click', () => modal.style.display = 'none');
wrapper.querySelector('button').addEventListener('click', () => modal.style.display = 'flex');

modalBg.addEventListener('click', e => {
    modal.style.display = 'none';
})

// Input

// Enter book info
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const table = document.querySelector('table');


// Press 'add'
document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	addBook();
	displayBooks();
});

function Book(title, author, pages, haveRead) {
	this.id = Date.now();
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

// new Book object is created and added to library
let library = [];

const createBook = () => new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
const addBook = () => {
	library.push(createBook());
	console.log(library);
	clearInputs();
}
// inputs are cleared
function clearInputs() {
	const inputs = form.querySelectorAll('input');
	inputs.forEach(input => input.value = null);
}
// book is added on-screen
function displayBooks() {
	library.forEach(book => {
		const newBook = document.createElement('tr');
		const newBookTitle = document.createElement('td');
		newBookTitle.textContent = book.title;
		const newBookAuthor = document.createElement('td');
		newBookAuthor.textContent = book.author;
		const newBookPages = document.createElement('td');
		newBookPages.textContent = book.pages;
		const newBookRead = document.createElement('td');
		newBookRead.textContent = book.haveRead ? 'Yes' : 'No';

		newBook.appendChild(newBookTitle);
		newBook.appendChild(newBookAuthor);
		newBook.appendChild(newBookPages);
		newBook.appendChild(newBookRead);

		table.appendChild(newBook);
	})
}