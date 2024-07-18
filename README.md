# MERN Auth Project

This repository contains a full-stack application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It includes secure authentication with JSON Web Tokens (JWT), cookie handling for session management, and robust input validation using express-validator.

## Project Structure

```
/backend      # Node.js/Express backend
/auth         # React frontend
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/atharva-narkhede/Mern-Authentication-App.git
   cd mern-auth-project
   ```

2. Install dependencies for both backend and frontend:
   ```sh
   cd backend
   npm install

   cd ../auth
   npm install
   ```

### Configuration

#### Backend

1. Create a `.env` file in the `backend` directory and add the following:
   ```env
   MONGO_URI='your_mongodb_connection_string'
   JWT_SECRET='your_jwt_secret'
   ```

#### Frontend (Auth)

1. Create a `.env` file in the `auth` directory and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

### Running the Application

#### Backend

1. Start the backend server:
   ```sh
   cd backend
   npm run dev
   ```

#### Frontend (Auth)

1. Start the React development server:
   ```sh
   cd auth
   npm start
   ```

### Usage

- Navigate to `http://localhost:3000` in your browser to access the frontend.
- The backend API is accessible at `http://localhost:5000`.

## Secure Authentication and Validation

### Authentication

The backend uses JWT for secure authentication. Tokens are generated during login and stored in HTTP-only cookies for secure session management. The tokens are verified on each request to protected routes to ensure that only authenticated users can access them.

### Input Validation

The application uses `express-validator` to validate and sanitize input data. This ensures that all user inputs are checked for validity and sanitized to prevent security vulnerabilities such as SQL injection and XSS attacks.

## Libraries Used

### Backend Libraries

- **bcryptjs**: For hashing and comparing passwords.
- **cookie-parser**: To parse cookies in requests.
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: To manage environment variables.
- **express**: For creating the server and handling routes.
- **express-validator**: For validating and sanitizing input data.
- **helmet**: To secure HTTP headers.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **mongoose**: For interacting with MongoDB.
- **winston**: For logging information and errors.

### Frontend Libraries

- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point to the DOM and server renderers for React.
- **react-router-dom**: Declarative routing for React.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **bootstrap**: Front-end framework for building responsive, mobile-first sites.
- **styled-components**: Library for styling React components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
