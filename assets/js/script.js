// BOOK LIST PROJECT // ***

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {
    UI.prototype.addBookToList = function(book){
        console.log(book);
      }
}

// class script {
    
// }


// Add Book to List



// Event Listeners
document.querySelector('#book-form').addEventListener('submit', 
function(e) {
    // Get form values
    const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    // Instantiating book
    const book = new Book(title, author, isbn);

    // instantiate ui
    const ui = new UI();
    console.log(ui);

    // Add book to list
    ui.addBookToList(book);

console.log(book);

    
    e.preventDefault();
})

