let myLibrary = [];

const domElements = (() => {
	return {
		bookCardsDiv: document.querySelector('.bookcards'),
		addNewBookFormDiv: document.querySelector('.newBookFormWrapper'),
		newBookForm: document.getElementById('newBookForm'),
		closeNewBookForm: document.getElementById('closeNewBookForm'),
	};
})();

const createAddNewBookBtn = (() => {
	const addNewBookBtn = document.createElement('button');
	addNewBookBtn.id = 'addNew';
	addNewBookBtn.innerHTML = `Add <i class="fas fa-book"></i>`;

	return { addNewBookBtn };
})();

//Book class
class Book {
	constructor(title, author, pages, isRead) {
		this.title = title;
		this.author = author;
		this.pages = pages + ' pages';
		this.isRead = isRead ? 'Read' : 'Not Read';
	}

	static addBookToLibrary(...books) {
		books.forEach((book) => myLibrary.push(book));
	}

	static setLocalStorage() {
		window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
	}
}

//hard coding some sample books
let b1 = new Book('One Shot', 'Lee Child', 296, false);
let b2 = new Book('Harry Potter', 'J.K. Rowling', 560, false);
let b3 = new Book('Fellowship of the Ring', 'J.R.R. Tolkein', 690, false);
let b4 = new Book('The Two Towers', 'J.R.R. Tolkein', 450, false);
let b5 = new Book('The Return of The King', 'J.R.R. Tolkein', 750, false);
let b6 = new Book('Killing Floor', 'Lee Child', 296, false);
let b7 = new Book('Tripwire', 'Lee Child', 396, false);

Book.addBookToLibrary(b1, b2, b3, b4, b5, b6);

// function to create and populate book cards

const createNewBookCard = (key, title, author, pages, isRead) => {
	//create the bookcard wrapper div and add to bookcards
	let bookCard = document.createElement('div');
	bookCard.classList.add('bookcard');
	bookCard.dataset.keyIndex = key;
	domElements.bookCardsDiv.appendChild(bookCard);

	// create and add the delete icon
	let delBtnIcon = document.createElement('i');
	delBtnIcon.id = 'delete';
	delBtnIcon.classList.add('fas', 'fa-minus-circle', 'fa-lg');

	//create and add the four child wrapper divs to bookcard
	let bookTitleWrapper = document.createElement('div');
	let bookAuthorWrapper = document.createElement('div');
	let bookPageCountWrapper = document.createElement('div');
	let bookReadStatusWrapper = document.createElement('div');

	bookCard.append(
		delBtnIcon,
		bookTitleWrapper,
		bookAuthorWrapper,
		bookPageCountWrapper,
		bookReadStatusWrapper,
	);

	//create and add two child divs for each wrapper
	let bookTitleLabel = document.createElement('div');
	bookTitleLabel.textContent = 'Title: ';
	let bookTitleHolder = document.createElement('div');
	bookTitleHolder.classList.add('bookTitle');
	let bookTitlePara = document.createElement('p');
	bookTitleHolder.appendChild(bookTitlePara);
	bookTitlePara.classList.add('overflow');

	let bookAuthorLabel = document.createElement('div');
	bookAuthorLabel.textContent = 'Author: ';
	let bookAuthorHolder = document.createElement('div');
	bookAuthorHolder.classList.add('bookAuthor');
	let bookAuthorPara = document.createElement('p');
	bookAuthorHolder.appendChild(bookAuthorPara);
	bookAuthorPara.classList.add('overflow');

	let bookPageCountLabel = document.createElement('div');
	bookPageCountLabel.textContent = 'Page Count: ';
	let bookPageCountHolder = document.createElement('div');
	bookPageCountHolder.classList.add('bookPageCount');

	let bookReadStatusLabel = document.createElement('div');
	bookReadStatusLabel.textContent = 'Reading Status: ';
	let bookReadStatusHolder = document.createElement('div');
	bookReadStatusHolder.classList.add('bookReadStatus');

	bookTitleWrapper.append(bookTitleLabel, bookTitleHolder);
	bookAuthorWrapper.append(bookAuthorLabel, bookAuthorHolder);
	bookPageCountWrapper.append(bookPageCountLabel, bookPageCountHolder);
	bookReadStatusWrapper.append(bookReadStatusLabel, bookReadStatusHolder);

	//add title, author, pages, isRead to each Holder div as per the input
	bookTitlePara.textContent = title;
	bookTitlePara.title = title;
	bookAuthorPara.textContent = author;
	bookAuthorPara.title = author;
	bookPageCountHolder.textContent = pages;
	bookReadStatusHolder.textContent = isRead;

	//create and add the update status btn
	let updateReadStatusBtn = document.createElement('button');
	updateReadStatusBtn.id = 'changeReadStatus';
	updateReadStatusBtn.textContent = 'Update Status';

	bookCard.appendChild(updateReadStatusBtn);
};

//event lister on the parent div for event delegation.
domElements.bookCardsDiv.addEventListener('click', (e) => {
	if (e.target.id === 'delete') {
		const bookKeyIndex = e.target.parentElement.dataset.keyIndex;
		//remove the book from the library
		myLibrary.splice(bookKeyIndex, 1);
	} else if (e.target.id === 'addNew') {
		//fade the background
		domElements.bookCardsDiv.classList.add('bg-fade');
		// open up the form in the correct position. Eg: if user scrolls down and clicks on add new book, the form should pop up there.
		const formPosition = `${parseInt(window.pageYOffset)}px`;
		domElements.addNewBookFormDiv.style.top = formPosition;
		domElements.addNewBookFormDiv.style.display = 'flex';
	} else if (e.target.id === 'changeReadStatus') {
		let currentReadingStatus = e.target.previousElementSibling.lastElementChild;
		let currentBook = e.target.parentElement;
		if (currentReadingStatus.textContent === 'Read')
			myLibrary[currentBook.dataset.keyIndex].isRead = 'Not Read';
		else myLibrary[currentBook.dataset.keyIndex].isRead = 'Read';
	}

	//set the local storage library to the current updated library
	Book.setLocalStorage();
	//render the updated library
	render();
});

//new Book Form submit
domElements.newBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const entries = formData.entries();
	const data = Object.fromEntries(entries);
	let isRead = data['readingStatus'] === 'read' ? true : false;

	let newBook = new Book(
		data['title'],
		data['author'],
		data['pgCount'],
		isRead,
	);

	//add book to library
	Book.addBookToLibrary(newBook);

	//set the local storage library to the current updated library
	Book.setLocalStorage();

	//index of the new book will be UpdatedLibraryArray.length-1
	let key = myLibrary.length - 1;
	// create the new book card and add to DOM
	createNewBookCard(
		key,
		newBook.title,
		newBook.author,
		newBook.pages,
		newBook.isRead,
	);
	domElements.newBookForm.reset();
	domElements.bookCardsDiv.classList.remove('bg-fade');
	domElements.addNewBookFormDiv.style.display = 'none';
});

//close form btn
domElements.closeNewBookForm.addEventListener('click', (e) => {
	domElements.bookCardsDiv.classList.remove('bg-fade');
	domElements.addNewBookFormDiv.style.display = 'none';
});

// redner all books to the DOM
const render = () => {
	//clear up the all books and add the addNewBookBtn
	domElements.bookCardsDiv.innerHTML = '';
	domElements.bookCardsDiv.appendChild(createAddNewBookBtn.addNewBookBtn);

	//populate the books
	if (!localStorage.myLibrary)
		myLibrary.forEach((book) => {
			let key = myLibrary.indexOf(book);
			createNewBookCard(key, book.title, book.author, book.pages, book.isRead);
		});
	else {
		let localStorageLibrary = JSON.parse(localStorage.getItem('myLibrary'));
		localStorageLibrary.forEach((book) => {
			let key = localStorageLibrary.indexOf(book);
			createNewBookCard(key, book.title, book.author, book.pages, book.isRead);
		});
	}
};
window.onload = () => {
	if (localStorage.myLibrary) myLibrary = JSON.parse(localStorage.myLibrary);
};
render();
