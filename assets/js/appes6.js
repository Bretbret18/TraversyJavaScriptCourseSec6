
// Here we use es6 syntax: classes 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.querySelector('#book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

    list.appendChild(row);


    };


    showAlert(message, className) {
        // Create Div
    const div = document.createElement('div');
    // Add Classes
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);

    // Timeout after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }


    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

// Local Storage Class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;

            // Add Book to UI
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
};


// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks())

// Event Listeners for add book
document.querySelector('#book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.querySelector('#title').value,
            author = document.querySelector('#author').value,
            isbn = document.querySelector('#isbn').value;

        // Instantiating book
        const book = new Book(title, author, isbn);
        console.log(book);
        // instantiate ui
        const ui = new UI();
        console.log(ui);

        // Validate
        if (title === '' || author === '' || isbn === '') {
            // Error Alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {
            // Add book to list
            ui.addBookToList(book);

            // Add to Local Storage
            Store.addBook(book);

            // Show Success
            ui.showAlert('Book Added!', 'success');

            // Clear fields
            ui.clearFields()
        }

        e.preventDefault();
    });

// Event Listener for Delete
document.querySelector('#book-list').addEventListener
    ('click', function (e) {

        // instantiate ui
        const ui = new UI();

        ui.deleteBook(e.target);

        // Remove From Local Storage
        // targets isbn number
        Store.removeBook(e.target.parentElement.
            previousElementSibling.textContent)
        

        // Show Alert
        ui.showAlert('Book removed', 'success');
    });
