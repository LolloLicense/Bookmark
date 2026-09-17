# Bookmark

Bookmark is a fullstack book application originally created as a group assignment in the API Development course at Medieinstitutet.

This repository is my own continued version of the project, developed further and deployed with Vercel and MongoDB Atlas.

Visitors can browse books and reviews, registered users can log in and manage their account, while administrators have access to protected functionality for managing users and books.

## Built with

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
 ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge) ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black) ![Cookie Parser](https://img.shields.io/badge/Cookie_Parser-000000?style=for-the-badge) ![CORS](https://img.shields.io/badge/CORS-663399?style=for-the-badge)![Insomnia](https://img.shields.io/badge/Insomnia-%23000.svg?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)


## Live demo

Bookmark is deployed with Vercel and uses MongoDB Atlas for the database.

**[Explore Bookmark](https://bookmark-omega-ten.vercel.app/)**

## Features

### Books

- View all books
- View a specific book
- Search books by title or author
- Sort books alphabetically
- View reviews connected to a book
- Admin can add, edit and delete books in the library

### Users

- Register an account
- Log in and log out
- View, update and delete account information in Settings
- Admin can view and delete users

### Reviews

- View reviews
- Create reviews (Users)
- Update reviews (Admin)
- Delete reviews (Admin)

## Psst...

Want to explore the admin side of Bookmark?

I've left a demo admin account somewhere in this repository.

Find it, explore and please be respectful. 👀

## My work

My main responsibility in the group project was the user and authentication area, covering both backend functionality and the connected UI.

I built the registration and login flows, JWT authentication, protected routes, account settings and user management. I also created the admin content management interface for managing users and books, implemented book search and sorting, and worked extensively with the UI and visual design of the application.

After completing the group project, I created this independent version of Bookmark and deployed the fullstack application with Vercel and MongoDB Atlas.

## Project structure

```text
├── server.ts
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

