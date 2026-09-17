const bookDetails = document.getElementById('book-details');

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

async function getBook() {
  try {
    const response = await fetch(`/api/books/${bookId}`);

    if (!response.ok) {
      throw new Error('Could not find book');
    }

    const book = await response.json();

    document.title = `Bookmark - ${book.title}`;

    console.log('Book:', book);

    bookDetails.innerHTML = `
  <div class="row book-details-card p-4 mt-4 rounded-3">
  
  <div class="book-image-container d-flex justify-content-center">

      <img
        src="${book.image}"
        class="img-fluid rounded book-detail-image w-100 object-fit-cover"
        alt="${book.title}"
      >

    </div>

    <div class="px-4 py-2">

      <h1 class="book-detail-title mb-4">${book.title}</h1>

      <div class="mb-3">

        <p>
          <strong>Author:</strong> ${book.author}
        </p>

        <p>
          <strong>Year:</strong> ${book.published_year}
        </p>

        <p>
          <strong>Genres:</strong> ${book.genres.join(', ')}
        </p>

      </div>

      <hr class="opacity-50">

      <h2 class="mb-3">Description</h2>

      <p class="book-description lh-l">
        ${book.description}
      </p>

    </div>

  </div>
`;
  } catch (error) {
    console.error('Could not fetch book:', error);

    bookDetails.innerHTML = `
      <p>Could not load book.</p>
    `;
  }
}

getBook();
