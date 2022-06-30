# LIBRARY APP
# 👉[Live Preview](https://nashitshayan.github.io/library-project/)👈
![projectDemo](https://media.giphy.com/media/cs1axDXKQMmYq46hij/giphy.gif)

## Description
> An online libarry that allows the user to add, update or delete books. Once done reading, they can also change the reading status. The library is stored in the user's browser local storage so the data will not get lost upon reload or window/tab close. 

## Learnings
1. Understanding objects and object contructors in javascript.
2. Understadning prototypes and prototypal inheritance.
3. Implementing CRUD functionality.
4. Use of IIFEs.
5. Use of event delegation.
6. Using browser local storage for data persistence.

## Technologies used
1. HTML
2. CSS
3. vanillaJS

## Challenges I faced
1. Took me a while to wrap my head around the object constructor pattern and prototypal inheritance.
2. Firguring out how to structure my code and extract functions where needed (I still don't think I've a good job here)
3. I had to take a detour to learn about event delegation, as I was starting to add many event listeners. Instead I ended up with just one event listener on the parent element and used if-else checking the element id to implement the appropriate functionality. 
4. Adding in local storage was also a challenge. I took help from various blogs.

## Room for improvement
1. Maybe in future I'll use Firebase to add authentication and database.
2. The UI can definitely be improved a lot. 
3. A way to filter books by genre.
4. Folders for 'reading list' , 'read' , 'favorites' etc.
