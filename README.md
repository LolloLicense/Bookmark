# Bookmark API

Bookmark is a fullstack book application created as a group assignment in the API Development course at Medieinstitutet. The application allows visitors to browse books and reviews, while registered users can log in and manage their account. Administrators have access to protected functionality for managing users and books.

## Built with

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge) ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black) ![Cookie Parser](https://img.shields.io/badge/Cookie_Parser-000000?style=for-the-badge) ![CORS](https://img.shields.io/badge/CORS-663399?style=for-the-badge)![Insomnia](https://img.shields.io/badge/Insomnia-%23000.svg?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![VS%20Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Features

### Books

- View all books
- View a specific book
- Search books by title or author
- Sort books alphabetically
- View reviews connected to a book
- Admin can add, edit and delete book in library

### Users

- Register account
- Log in and log out
- View update and delete account information in Settings
- Admin can view and delete users in All users

### Reviews

- View reviews
- Create reviews (Users)
- Update reviews (Admin)
- Delete reviews (Admin)

### Authentication

- Passwords are hashed with bcrypt
- Authentication uses JWT stored in an HTTP-only cookie
- Protected routes require authentication
- Admin routes require admin authorization

## API endpoints

<table>
<tr>
<th>Resource</th>
<th>Method</th>
<th>Endpoint</th>
<th>Access</th>
</tr>

<tr>
<td><strong>Auth</strong></td>
<td>POST</td>
<td><code>/api/auth/register</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>POST</td>
<td><code>/api/auth/login</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>POST</td>
<td><code>/api/auth/logout</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>GET</td>
<td><code>/api/auth/me</code></td>
<td>Authenticated</td>
</tr>

<tr>
<td><strong>Users</strong></td>
<td>GET</td>
<td><code>/api/users</code></td>
<td>Admin</td>
</tr>
<tr>
<td></td>
<td>GET</td>
<td><code>/api/users/:id</code></td>
<td>Authenticated</td>
</tr>
<tr>
<td></td>
<td>PATCH</td>
<td><code>/api/users/:id</code></td>
<td>Authenticated</td>
</tr>
<tr>
<td></td>
<td>DELETE</td>
<td><code>/api/users/:id</code></td>
<td>Authenticated</td>
</tr>

<tr>
<td><strong>Books</strong></td>
<td>GET</td>
<td><code>/api/books</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>GET</td>
<td><code>/api/books/:id</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>POST</td>
<td><code>/api/books</code></td>
<td>Admin</td>
</tr>
<tr>
<td></td>
<td>PATCH</td>
<td><code>/api/books/:id</code></td>
<td>Admin</td>
</tr>
<tr>
<td></td>
<td>DELETE</td>
<td><code>/api/books/:id</code></td>
<td>Admin</td>
</tr>

<tr>
<td><strong>Reviews</strong></td>
<td>GET</td>
<td><code>/api/reviews</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>GET</td>
<td><code>/api/reviews/:id</code></td>
<td>Public</td>
</tr>
<tr>
<td></td>
<td>POST</td>
<td><code>/api/reviews</code></td>
<td>Authenticated</td>
</tr>
<tr>
<td></td>
<td>PATCH</td>
<td><code>/api/reviews/:id</code></td>
<td>Admin</td>
</tr>
<tr>
<td></td>
<td>DELETE</td>
<td><code>/api/reviews/:id</code></td>
<td>Admin</td>
</tr>
</table>

## Getting started

### 1. Clone the repository

```bash
git clone <https://github.com/minza-42/API-grupp-3.git>
cd API-grupp-3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root of the project.

```env
PORT=3000
MONGODB_URL=
JWT_SECRET=
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Add your own MongoDB connection string and JWT secret.

### 4. MongoDB

The application uses MongoDB with Mongoose. Connect `MONGODB_URL` to your own MongoDB database. The required collections are created automatically by Mongoose when data is added.

The application uses the following collections:

- `users`
- `books`
- `reviews`

### 5. Start the application

```bash
npm run dev
```

Open:

`http://localhost:3000`

## Project structure

```text
├── api/
│   └── index.ts
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── public/
    ├── css/
    ├── images/
    ├── js/
    ├── index.html
    ├── book.html
    ├── library.html
    ├── settings.html
    └── users.html
```

## Group members


## Database models

### User

- `username`
- `password`
- `is_admin`
- `created_at`

### Book

- `title`
- `description`
- `author`
- `genres`
- `image`
- `published_year`

### Review

- `name`
- `content`
- `rating`
- `created_at`
- `book_id`

## Security

The application uses:

- bcrypt for password hashing
- JWT for authentication
- HTTP-only cookies
- Authentication middleware for protected routes
- Admin middleware for administrator-only functionality

Passwords and environment variables are not exposed to the client or committed to the repository.
