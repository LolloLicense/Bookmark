let selectedBookId = null;

const editModal = document.getElementById('edit-book-modal');
editModal.addEventListener('hide.bs.modal', () => {
  document.activeElement.blur();
});

const addModal = document.getElementById('add-book-modal');
addModal.addEventListener('hide.bs.modal', () => {
  document.activeElement.blur();
});

async function getBooks(searchQuery = '') {
  const response = await fetch(API_URL + `/books?search=${searchQuery}&sort=asc`);

  if (!response.ok) {
    throw new Error('Could not fetch books');
  }

  const books = await response.json();

  return books;
}

const serachInput = document.getElementById('search-input');

serachInput.addEventListener('input', async () => {
  const books = await getBooks(serachInput.value);

  renderBooks(books);
  handleEditBtns(books);
  handleDeleteBtns();
});

function renderBooks(books) {
  const tableBody = document.getElementById('library-table-body');

  // Render book table
  tableBody.innerHTML = books
    .map(book => {
      return `
        <tr class="d-flex flex-row justify-content-between align-items-center">
          
            <td class="table-book-title p-0 fs-5 border-bottom">${book.title}
            </td>
            <small class="fst-italic d-block"> by: ${book.author}</small>
            <td class="d-flex gap-4">
                <button class="btn btn-outline-info edit-book-btn" data-id="${book._id}">
                    Edit
                </button>
                <button class="btn btn-light delete-book-btn" data-id="${book._id}">
                    Delete
                </button>
            </td>
        </tr>      
        `;
    })
    .join('');
}

//PATCH
function handleEditBtns(books) {
  document.querySelectorAll('.edit-book-btn').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.dataset.id;
      selectedBookId = bookId;
      console.log('bookId from button:', bookId);

      console.log('books:', books);
      //loops array and find the book that matches with the bookID
      const selectedBook = books.find(book => book._id === bookId);
      // gets all content from book-info into edit-modal
      document.getElementById('edit-title').value = selectedBook.title;
      document.getElementById('edit-author').value = selectedBook.author;
      document.getElementById('edit-description').value = selectedBook.description;
      document.getElementById('edit-genres').value = selectedBook.genres.join(', ');
      document.getElementById('edit-year').value = selectedBook.published_year;
      document.getElementById('edit-image').value = selectedBook.image;
      // Opens modal
      const modal = new bootstrap.Modal(document.getElementById('edit-book-modal'));
      modal.show();
    });
  });
}
//DELETE
function handleDeleteBtns() {
  document.querySelectorAll('.delete-book-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const bookId = button.dataset.id;

      const confirmDelete = confirm('Are you sure you want to delete this book?');

      if (!confirmDelete) {
        return;
      }
      try {
        const response = await fetch(API_URL + `/books/${bookId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Unable to delete book');
        }
        checkAdmin();
      } catch (error) {
        console.log(error);
      }
    });
  });
}

async function checkAdmin() {
  try {
    const user = await getCurrentUser();

    if (!user?.is_admin) {
      console.log('Access denied');
      return;
    }
    console.log('Admin verified');
    const books = await getBooks();

    renderBooks(books);

    handleEditBtns(books);

    handleDeleteBtns();
  } catch (error) {
    console.log(error);
  }
}

// PATCH edit by submtting edit-modal-form
const editForm = document.getElementById('edit-book-form');
editForm.addEventListener('submit', async event => {
  event.preventDefault();

  const patchBook = {
    title: document.getElementById('edit-title').value,
    author: document.getElementById('edit-author').value,
    description: document.getElementById('edit-description').value,
    genres: document
      .getElementById('edit-genres')
      .value.split(',')
      .map(genre => genre.trim()),
    published_year: Number(document.getElementById('edit-year').value),
    image: document.getElementById('edit-image').value,
  };

  try {
    const response = await fetch(API_URL + `/books/${selectedBookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(patchBook),
    });
    if (!response.ok) {
      throw new Error('Unable to patch book');
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('edit-book-modal'));
    modal.hide();
    checkAdmin();
  } catch (error) {
    console.log(error);
  }
});

// POST by creating a add new book- form-modal
const addForm = document.querySelector('#add-book-form');
addForm.addEventListener('submit', async event => {
  event.preventDefault();

  const newBook = {
    title: document.getElementById('add-title').value,
    author: document.getElementById('add-author').value,
    description: document.getElementById('add-description').value,
    genres: document
      .getElementById('add-genres')
      .value.split(',')
      .map(genre => genre.trim()),
    published_year: Number(document.getElementById('add-year').value),
    image: document.getElementById('add-image').value,
  };
  try {
    const response = await fetch(API_URL + '/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newBook),
    });
    console.log('POST status:', response.status);

    const data = await response.json();

    console.log('POST response:', data);
    if (!response.ok) {
      throw new Error('Unable to create new book');
    }
    console.log('Book created');
    addForm.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('add-book-modal'));

    modal.hide();
    checkAdmin();
  } catch (error) {
    console.log(error);
  }
});

checkAdmin();
