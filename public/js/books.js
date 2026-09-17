const booksList = document.getElementById('books-list');
const searchInput = document.getElementById('search-input');
const sortBtn = document.getElementById('sort-btn');
const ascIcon = document.getElementById('sort-asc-icon');
const descIcon = document.getElementById('sort-desc-icon');

let sortOrder = 'asc';

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value;
  getBooks(searchQuery);
});

sortBtn.addEventListener('click', () => {
  if (sortOrder === 'asc') {
    sortOrder = 'desc';
    ascIcon.classList.add('d-none');
    descIcon.classList.remove('d-none');
  } else {
    sortOrder = 'asc';
    ascIcon.classList.remove('d-none');
    descIcon.classList.add('d-none');
  }
  getBooks(searchInput.value);
});

async function getBooks(searchQuery = '') {
  try {
    const response = await fetch(`/api/books?search=${searchQuery}&sort=${sortOrder}`);
    const books = await response.json();

    booksList.innerHTML = '';

    books.forEach(book => {
      const bookCard = document.createElement('div');

      bookCard.classList.add('col-xl-3', 'col-lg-4', 'col-md-6', 'col-12', 'mb-4');

      bookCard.innerHTML = `
        <div class="card text-white bg-black bg-opacity-50 shadow h-100">

          <img
          src="${book.image}"
          class="card-img-top w-100 object-fit-cover"
          alt="${book.title}"
          loading="lazy"
          >

          <div class="card-body d-flex flex-column">

            <div class="book-info">
              <h2 class="card-title fs-5 fw-bold mt-2">${book.title}</h2>
              <p class="card-text mt-3 author">
                <strong>Author:</strong> ${book.author}
              </p>
              <p class="card-text year">
                <strong>Year:</strong> ${book.published_year}
              </p>
              <p class="card-text genres">
                <strong>Genres:</strong> ${book.genres.join(', ')}
              </p> 
            </div>

            <button class="btn btn-light view-book-btn px-3 mt-auto align-self-start">
              View book
            </button>

          </div>
        </div>
      `;

      // Visa bok
      const viewButton = bookCard.querySelector('.view-book-btn');

      viewButton.addEventListener('click', () => {
        window.location.href = `book.html?id=${book._id}`;
      });

      booksList.appendChild(bookCard);
    });
  } catch (error) {
    console.error('Could not fetch books:', error);

    booksList.innerHTML = `
      <p>Could not fetch books.</p>
    `;
  }
}

// Ladda böcker när sidan öppnas
getBooks();
