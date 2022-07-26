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
	const addNewBookBtn = R.compose(
		attr('id', 'addNew'),
		setInnerHTML(`Add <i class="fas fa-book"></i>`),
	)(elem('button'));
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
//localStorage.clear();
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
	let delBtnIcon = R.compose(
		attr('id', 'delete'),
		attr('class', 'fas fa-minus-circle fa-lg'),
	)(elem('i'));

	let bookTitleLabel = setContent('Title:', elem('div'));
	let bookTitleHolder = attr('class', 'bookTitle', elem('div'));
	let bookTitleText = R.compose(
		setContent(title),
		attr('class', 'overflow'),
	)(elem('p'));
	append(bookTitleText, bookTitleHolder);

	let bookAuthorLabel = setContent('Author:', elem('div'));
	let bookAuthorHolder = attr('class', 'bookAuthor', elem('div'));
	let bookAuthorText = R.compose(
		setContent(author),
		attr('class', 'overflow'),
	)(elem('p'));
	append(bookAuthorText, bookAuthorHolder);

	let bookPageCountLabel = setContent('Page Count:', elem('div'));
	let bookPageCountHolder = R.compose(
		setContent(pages),
		attr('class', 'bookPageCount'),
	)(elem('div'));

	let bookReadStatusLabel = setContent('Reading Status:', elem('div'));
	let bookReadStatusHolder = R.compose(
		setContent(isRead),
		attr('class', 'bookReadStatus'),
	)(elem('div'));

	let bookTitleWrapper = R.compose(
		append(bookTitleHolder),
		append(bookTitleLabel),
	)(elem('div'));
	let bookAuthorWrapper = R.compose(
		append(bookAuthorHolder),
		append(bookAuthorLabel),
	)(elem('div'));
	let bookPageCountWrapper = R.compose(
		append(bookPageCountHolder),
		append(bookPageCountLabel),
	)(elem('div'));
	let bookReadStatusWrapper = R.compose(
		append(bookReadStatusHolder),
		append(bookReadStatusLabel),
	)(elem('div'));

	let updateReadStatusBtn = R.compose(
		setContent('Update Status'),
		attr('id', 'changeReadStatus'),
	)(elem('button'));

	let bookCard = R.compose(
		append(updateReadStatusBtn),
		append(bookReadStatusWrapper),
		append(bookPageCountWrapper),
		append(bookAuthorWrapper),
		append(bookTitleWrapper),
		append(delBtnIcon),
		attr('class', 'bookcard'),
		attr('data-id', `${key}`),
	)(elem('div'));

	grab('.bookcards').append(bookCard);
};

const handleDelete = (index) => myLibrary.splice(index, 1);
const handleAddForm = () => {
	addClass('bg-fade', grab('.bookcards'));
	R.compose(
		setStyle('top', `${parseInt(window.pageYOffset)}px`),
		setStyle('display', 'flex'),
	)(grab('.newBookFormWrapper'));
};
const handleChangeStatus = (currentStatus, currentBookIndex) =>
	(myLibrary[currentBookIndex].isRead =
		currentStatus === 'Read' ? 'Not Read' : 'Read');

const app = (dispatch) => {
	const addEvents = dispatch((e) => {
		const id = e.target.id;
		id === 'delete'
			? handleDelete(e.target.parentElement.dataset.id)
			: id === 'addNew'
			? handleAddForm()
			: id === 'changeReadStatus'
			? handleChangeStatus(
					e.target.previousElementSibling.lastElementChild.textContent,
					e.target.parentElement.dataset.id,
			  )
			: undefined;

		//set the local storage library to the current updated library
		Book.setLocalStorage();
		//render the updated library
		render();
	});
};
const onCards = on('click', grab('.bookcards'));
app(onCards);

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
