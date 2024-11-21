# Book Review Platform

A full-stack book review platform built using React for the frontend, Node.js (Express) for the backend, and MongoDB for the database. Users can view books, leave reviews, and see other users' reviews on books.

## Features

- Users can view book details including title, author, genre, and description.
- Authenticated users can submit reviews for books.
- Reviews from all users are displayed under each book.
- Only authenticated users can submit reviews.
- Responsive and user-friendly UI built with React and TailwindCSS.

## Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zoomgy/book-review-platform.git
cd book-review-platform
```

### 2. Install Backend Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 4. Set Up Environment Variables

For the backend, create a .env file in the root of the backend directory:
MONGODB_URI=mongodb://localhost:27017/bookreview
PORT=3000
JWT_SECRET=your-jwt-secret

### 5. Start the Backend

Run the backend server:

```bash
cd backend
npm start
```

This will start the server on http://localhost:3000.

### 6. Start the Frontend

Navigate to the frontend directory and start the React app:

```bash
cd frontend
npm start
```

The React app will run on http://localhost:3001 (or a different port if specified).

API Endpoints

### 1. GET /book/:id

Fetches details of a book by its id (including reviews).
Response:

```json
{
  "id": "1",
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "description": "Description of the book",
  "reviews": [
    {
      "userId": "user1",
      "review": "Great book!"
    }
  ]
}
```

### 2. POST /book/:id/review

Adds a review for a book.
Request Body:

```json
{
  "userId": "user_id",
  "review": "This is my review"
}
```
