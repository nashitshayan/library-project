let myLibrary= [];


const bookCardsDiv= document.querySelector('.bookcards');
const deleteBookBtnList= document.querySelectorAll('#delete');
const addNewBookFormDiv= document.querySelector('.newBookFormWrapper');
const newBookForm= document.getElementById('newBookForm');
const submitNewBookFormBtn= document.getElementById('submitForm');


// deleteBookBtn.addEventListener('click', ()=>{bookCardsDiv.removeChild(deleteBookBtn.parentElement)})


const createNewBookCard= (title,author,pages,isRead)=>{
    //create the bookcard wrapper div and add to bookcards
     let bookCard= document.createElement('div');
     bookCard.classList.add("bookcard");
    bookCardsDiv.appendChild(bookCard);

    // create and add the delete icon
    let delBtnIcon= document.createElement('i');
    delBtnIcon.id='delete';
    delBtnIcon.classList.add('fas', 'fa-minus-circle', 'fa-lg')
    // console.log(delBtnIcon)


    //create and add the four child wrapper divs to bookcard

    let bookTitleWrapper= document.createElement('div');
    let bookAuthorWrapper= document.createElement('div');
    let bookPageCountWrapper= document.createElement('div');
    let bookReadStatusWrapper= document.createElement('div');

    bookCard.append(delBtnIcon,bookTitleWrapper, bookAuthorWrapper, bookPageCountWrapper, bookReadStatusWrapper);

    //create and add two child divs for each wrapper
    
    let bookTitleLabel= document.createElement('div');
    bookTitleLabel.textContent='Title: ';
    let bookTitleHolder= document.createElement('div');
    bookTitleHolder.classList.add('bookTitle');

    let bookAuthorLabel= document.createElement('div');
    bookAuthorLabel.textContent='Author: ';
    let bookAuthorHolder= document.createElement('div');
    bookAuthorHolder.classList.add('bookAuthor');

    let bookPageCountLabel= document.createElement('div');
    bookPageCountLabel.textContent='Page Count: ';
    let bookPageCountHolder= document.createElement('div');
    bookPageCountHolder.classList.add('bookPageCount');

    let bookReadStatusLabel= document.createElement('div');
    bookReadStatusLabel.textContent='Reading Status: ';
    let bookReadStatusHolder= document.createElement('div');
    bookReadStatusHolder.classList.add('bookReadStatus');

    bookTitleWrapper.append(bookTitleLabel, bookTitleHolder);
    bookAuthorWrapper.append(bookAuthorLabel, bookAuthorHolder);
    bookPageCountWrapper.append(bookPageCountLabel, bookPageCountHolder);
    bookReadStatusWrapper.append(bookReadStatusLabel, bookReadStatusHolder);

    //add title, author, pages, isRead to each Holder div as per the input

    bookTitleHolder.textContent= title;
    bookAuthorHolder.textContent= author;
    bookPageCountHolder.textContent= pages;
    bookReadStatusHolder.textContent= isRead;

 }



//Book ctor
function Book(title,author,pages,isRead) {
    this.title= title;
    this.author= author;
    this.pages = pages + ' pages';
    this.isRead= isRead? 'Read' : 'Not Read Yet';
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages } pages, ${this.isRead}`;
};

const addBookToLibrary= (...books)=>{
    books.forEach(book=>  myLibrary.push(book))
};

let b1= new Book('One Shot', 'Lee Child', 296, false);
let b2= new Book('Harry Potter', 'J.K. Rowling', 560, false);
let b3= new Book('Fellowship of the Ring', 'J.R.R. Tolkein', 690, false);
let b4= new Book('The Two Towers', 'J.R.R. Tolkein', 450, false);
let b5= new Book('The Return of The King', 'J.R.R. Tolkein', 750, false);
let b6= new Book('Killing Floor', 'Lee Child', 296, false);

addBookToLibrary(b1,b2,b3,b4,b5,b6)


myLibrary.forEach(book => {
    createNewBookCard(book.title, book.author, book.pages, book.isRead);
})


bookCardsDiv.addEventListener('click', (e)=>{
    console.log(e.target.id)
    if(e.target.id==='delete')
        bookCardsDiv.removeChild(e.target.parentElement);
    else if(e.target.id==='addNew')
        {
            bookCardsDiv.style.display='none';
            addNewBookFormDiv.style.display='flex';
        }
    
})

submitNewBookFormBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    
    let isRead= newBookForm.elements['readingStatus'].value==='read'? true: false;

    let newBook= new Book(newBookForm.elements['title'].value
    , newBookForm.elements['author'].value
    , newBookForm.elements['pgCount'].value, isRead);

    addBookToLibrary(newBook)
    createNewBookCard(newBook.title, newBook.author, newBook.pages, newBook.isRead)
   
   bookCardsDiv.style.display='flex';
    addNewBookFormDiv.style.display='none';
})
