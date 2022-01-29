let myLibrary= [];

const domElements= (()=>{
    return {
     bookCardsDiv : document.querySelector('.bookcards'),
     addNewBookFormDiv :document.querySelector('.newBookFormWrapper'),
     newBookForm : document.getElementById('newBookForm'),
     closeNewBookForm: document.getElementById('closeNewBookForm'),
    }
})();






//Book class
class Book{

    constructor(title,author,pages,isRead){
        this.title= title;
        this.author= author;
        this.pages = pages + ' pages';
        this.isRead= isRead? 'Read' : 'Not Read Yet';
    }

   static addBookToLibrary (...books){
        books.forEach(book=>  myLibrary.push(book))
    }
    
}



//hard coding some sample books
let b1= new Book('One Shot', 'Lee Child', 296, false);
let b2= new Book('Harry Potter', 'J.K. Rowling', 560, false);
let b3= new Book('Fellowship of the Ring', 'J.R.R. Tolkein', 690, false);
let b4= new Book('The Two Towers', 'J.R.R. Tolkein', 450, false);
let b5= new Book('The Return of The King', 'J.R.R. Tolkein', 750, false);
let b6= new Book('Killing Floor', 'Lee Child', 296, false);

Book.addBookToLibrary(b1,b2,b3,b4,b5,b6)



// function to create and populate book cards

const createNewBookCard= (title,author,pages,isRead)=>{
    //create the bookcard wrapper div and add to bookcards
    let bookCard= document.createElement('div');
    bookCard.classList.add("bookcard");
    domElements.bookCardsDiv.appendChild(bookCard);


    // create and add the delete icon
    let delBtnIcon= document.createElement('i');
    delBtnIcon.id='delete';
    delBtnIcon.classList.add('fas', 'fa-minus-circle', 'fa-lg')
    

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
    let bookTitlePara= document.createElement('p');
    bookTitleHolder.appendChild(bookTitlePara);
    bookTitlePara.classList.add('overflow');


    let bookAuthorLabel= document.createElement('div');
    bookAuthorLabel.textContent='Author: ';
    let bookAuthorHolder= document.createElement('div');
    bookAuthorHolder.classList.add('bookAuthor');
    let bookAuthorPara= document.createElement('p');
    bookAuthorHolder.appendChild(bookAuthorPara);
    bookAuthorPara.classList.add('overflow');


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
    bookTitlePara.textContent= title;
    bookAuthorPara.textContent= author;
    bookPageCountHolder.textContent= pages;
    bookReadStatusHolder.textContent= isRead;

    
    //create and add the update status btn
    let updateReadStatusBtn= document.createElement('button');
    updateReadStatusBtn.id= 'changeReadStatus';
    updateReadStatusBtn.textContent= 'Update Status';

    bookCard.appendChild(updateReadStatusBtn);
 }

//make a book card for each book in the library
myLibrary.forEach(book => {
    createNewBookCard(book.title, book.author, book.pages, book.isRead);
})


//event lister on the parent div for event delegation. 
domElements.bookCardsDiv.addEventListener('click', (e)=>{
    
    if(e.target.id==='delete')
        domElements.bookCardsDiv.removeChild(e.target.parentElement);
    else if(e.target.id==='addNew')
        {
            domElements.bookCardsDiv.style.display='none';
           domElements.addNewBookFormDiv.style.display='flex';
        }
    else if(e.target.id==='changeReadStatus')
        {   
            if(e.target.previousElementSibling.lastElementChild.textContent==='Read')
                e.target.previousElementSibling.lastElementChild.textContent='Not Read Yet'
            else
                e.target.previousElementSibling.lastElementChild.textContent='Read';
            
        }
    
})

//new Book Form submit
domElements.newBookForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = formData.entries(); 
    const data = Object.fromEntries(entries);
    let isRead= data['readingStatus']==='read'? true: false;

    let newBook= new Book(data['title'],
                            data['author'],
                            data['pgCount'], 
                            isRead);
    Book.addBookToLibrary(newBook)
    createNewBookCard(newBook.title, newBook.author, newBook.pages, newBook.isRead)
    domElements.newBookForm.reset();
    domElements.bookCardsDiv.style.display='flex';
    domElements.addNewBookFormDiv.style.display='none';
    
})

//close form btn 
domElements.closeNewBookForm.addEventListener('click', (e)=>{
    domElements.bookCardsDiv.style.display='flex';
    domElements.addNewBookFormDiv.style.display='none'; 
})
