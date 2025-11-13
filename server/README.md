# Full-Stack Blog - Backend Server

This is the backend server for the full-stack blog application, built with Node.js, Express, and MongoDB. It provides a RESTful API for user authentication and CRUD operations on blog posts.

## Features

- User registration and login with JWT authentication.
- Secure password hashing using `bcrypt.js`.
- Protected routes for creating, updating, and deleting posts.
- CRUD API for blog posts.
- Pagination and search functionality for fetching posts.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- MongoDB (a local instance or a cloud-based service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository** (or navigate to this directory).

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in this directory and copy the contents of `.env.example`.
    ```
    cp .env.example .env
    ```

4.  **Configure environment variables:**
    Open the `.env` file and fill in your MongoDB connection string (`MONGO_URI`) and a strong `JWT_SECRET`.

5.  **Run the server:**
    ```bash
    npm start
    ```
    The server will start on the port specified in your `.env` file (default is 5000).

---

## API Documentation

### Authentication (`/api/auth`)

-   **`POST /register`**: Register a new user.
    -   **Payload**: `{ "username": "testuser", "email": "test@example.com", "password": "password123" }`
    -   **Response**: `{ "token": "jwt_token" }`

-   **`POST /login`**: Log in an existing user.
    -   **Payload**: `{ "email": "test@example.com", "password": "password123" }`
    -   **Response**: `{ "token": "jwt_token" }`

### Posts (`/api/posts`)

-   **`GET /`**: Get all posts with pagination and search.
    -   **Query Params**: `?page=1&limit=10&search=keyword`
    -   **Access**: Public

-   **`GET /:id`**: Get a single post by its ID.
    -   **Access**: Public

-   **`POST /`**: Create a new post.
    -   **Access**: Private (requires authentication token in `x-auth-token` header)
    -   **Payload**: `{ "title": "My New Post", "content": "This is the content...", "imageURL": "http://..." }`

-   **`PUT /:id`**: Update an existing post.
    -   **Access**: Private (user must be the owner of the post)

-   **`DELETE /:id`**: Delete a post.
    -   **Access**: Private (user must be the owner of the post)