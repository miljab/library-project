let myLibrary = [
    {
        title: "Book1",
        author: "Author One",
        pages: 111,
        read: true
    },
    {
        title: "Book2",
        author: "Author Two",
        pages: 222,
        read: false
    },
    {
        title: "Book3",
        author: "Author Three",
        pages: 333,
        read: true
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const booksContainer = document.querySelector(".books");

function showBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement('div');
        card.className = "card";
        card.setAttribute("data-index", i);

        let ul = document.createElement('ul');
        let liTitle = document.createElement('li');
        liTitle.textContent = "Title: " + myLibrary[i].title;
        ul.appendChild(liTitle);
        let liAuthor = document.createElement("li");
        liAuthor.textContent = "Author: " + myLibrary[i].author;
        ul.appendChild(liAuthor);
        let liPages = document.createElement('li');
        liPages.textContent = "Pages: " + myLibrary[i].pages;
        ul.appendChild(liPages);
        let liRead = document.createElement('li');
        liRead.textContent = "Read: " + myLibrary[i].read;
        liRead.className = "read";
        ul.appendChild(liRead);
        
        let readButton = document.createElement('button');
        readButton.className = "read-button";
        readButton.textContent = myLibrary[i].read ? "UNREAD" : "READ";
        readButton.setAttribute("data-index", i);
        readButton.addEventListener("click", toggleRead);
        
        let deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.textContent = "REMOVE";
        deleteButton.setAttribute("data-index", i);
        deleteButton.addEventListener("click", deleteBook);


        card.appendChild(ul);
        card.appendChild(readButton);
        card.appendChild(deleteButton);
        booksContainer.appendChild(card);
    }
    
    let buttonContainer = document.createElement('div');
    buttonContainer.className = "button-container";
    let addButton = document.createElement('button');
    addButton.className = "add-button";
    addButton.textContent = "+";
    addButton.addEventListener("click", addBook);
    buttonContainer.appendChild(addButton);
    booksContainer.appendChild(buttonContainer);
}

function toggleRead(event) {
    this.textContent = this.textContent === "READ" ? "UNREAD" : "READ";
    let index = parseInt(this.dataset.index);
    myLibrary[index].read = !myLibrary[index].read;
    update();
}

function update() {
    booksContainer.textContent = "";
    showBooks();
}

function deleteBook() {
    let index = parseInt(this.dataset.index);
    myLibrary.splice(index, 1);
    update();
}

const dialog = document.querySelector("dialog");

function addBook() {
    dialog.showModal();
}

const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newTitle = document.querySelector("#title").value;
    let newAuthor = document.querySelector("#author").value;
    let newPages = parseInt(document.querySelector("#pages").value);
    let newRead = document.querySelector('input[name="read_status"]:checked').value == "true" ? true : false;

    let newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(newBook);

    addBookForm.reset();
    update();

    dialog.close();
});

showBooks();