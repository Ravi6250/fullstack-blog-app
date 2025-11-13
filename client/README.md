# Full-Stack Blog - Frontend Client

This is the frontend client for the full-stack blog application, built with React and Vite. It provides a user-friendly interface for interacting with the blog API.

## Features

- User registration and login forms with validation.
- A home page that displays all posts with pagination and search.
- A post detail page to view the full content of a post.
- Protected routes for creating and editing posts.
- Dynamic UI that changes based on authentication status.
- User-friendly notifications (toasts) for all actions.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)

### Installation & Setup

1.  **Clone the repository** (or navigate to this directory).

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Ensure the backend server is running.**
    This application expects the backend API to be running on `http://localhost:5000`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will open in your browser, typically at `http://localhost:5173`.

---

## Project Structure

-   **`/src/api`**: Contains the configured Axios instance for API calls.
-   **`/src/components`**: Contains reusable components like Header, PostCard, Loader, etc.
-   **`/src/context`**: Contains the `AuthContext` for global state management.
-   **`/src/pages`**: Contains the main page components for each route (Home, Login, CreatePost, etc.).