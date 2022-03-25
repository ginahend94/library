// MODAL
const wrapper = document.querySelector('.wrapper');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');
const form = document.querySelector('form');
const formCancel = form.querySelector('a');

formCancel.addEventListener('click', () => modal.style.display = 'none');
wrapper.querySelector('button').addEventListener('click', () => modal.style.display = 'flex');

modalBg.addEventListener('click', e => {
    modal.style.display = 'none';
})


const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const table = document.querySelector('table');



document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("new book!");
});

function Book(title, author, pages, haveRead) {
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