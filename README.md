# Full-Stack Blog Platform (MERN Stack)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A feature-rich, full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). This project provides a seamless user experience for creating, reading, updating, and deleting blog posts, secured by JWT-based authentication and presented through a modern, responsive UI styled with Tailwind CSS.

**🚀 Live Demo Link Here** <!-- Add your live project URL here for maximum impact! -->

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><strong>Home Page</strong></td>
    <td align="center"><strong>Post Detail Page</strong></td>
  </tr>
  <tr>
    <td><img src="./path/to/your/HomePage.png" alt="Home Page Screenshot" width="400"/></td>
    <td><img src="./path/to/your/PostDetailPage.png" alt="Post Detail Page Screenshot" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><strong>Login Page</strong></td>
    <td align="center"><strong>Create Post Page</strong></td>
  </tr>
    <tr>
    <td><img src="./path/to/your/LoginPage.png" alt="Login Page Screenshot" width="400"/></td>
    <td><img src="./path/to/your/CreatePostPage.png" alt="Create Post Page Screenshot" width="400"/></td>
  </tr>
</table>

<!-- Replace the image paths above with the correct paths to your screenshots -->

---

## ✨ Features

-   **Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Full CRUD for Posts**: Authenticated users can Create, Read, Update, and Delete blog posts.
-   **Authorization**: Users can only edit or delete their own posts, ensuring content integrity.
-   **Dynamic UI**: The interface intelligently adapts based on the user's authentication status.
-   **Search & Pagination**: Effortlessly find posts by title or author and navigate through pages.
-   **Profile / My Posts Page**: A dedicated page for users to view and manage their own posts.
-   **User-Friendly Feedback**: Interactive toast notifications for all major actions (success/error).
-   **Responsive Design**: A clean and modern UI that provides a great experience on all screen sizes, from mobile to desktop.
-   **Impressive Styling**: A visually appealing interface with a professional font, hover effects, and a clean layout using Tailwind CSS.

---

## 🛠️ Tech Stack

-   **Frontend**: React, React Router, Axios, Tailwind CSS, Vite
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: JWT (jsonwebtoken), bcrypt.js

---

## 🚀 Getting Started (Local Setup)

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   MongoDB (a local instance or a cloud-based service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ravi6250/fullstack-blog-app.git
    cd your-repository-name
    ```

2.  **Setup the Backend Server:**
    ```bash
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create the environment file
    # (Copy .env.example to .env and fill in your variables)
    cp .env.example .env
    ```
    -   Open the `server/.env` file and add your `MONGO_URI` and a strong `JWT_SECRET`.

3.  **Setup the Frontend Client:**
    ```bash
    # Navigate to the client directory from the root
    cd client

    # Install dependencies
    npm install

    # The client uses the .env.example variable by default for local setup
    ```

4.  **Run the Application:**
    -   You will need to run the client and server in **two separate terminals**.

    -   **Terminal 1 (Backend):**
        ```bash
        cd server
        npm start
        ```
        *The server will be running on `http://localhost:5000`*

    -   **Terminal 2 (Frontend):**
        ```bash
        cd client
        npm run dev
        ```
        *The React app will open at `http://localhost:5173` in your browser.*

---

## 📁 Folder Structure

The project is organized in a monorepo style with two distinct folders for the client and server, promoting clean code separation.