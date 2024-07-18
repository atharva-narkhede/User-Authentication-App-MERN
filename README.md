# MERN Auth Project

This repository contains a full-stack application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). The project is divided into two main parts:

1. **Backend**: Handles the server-side logic, including user authentication and database operations.
2. **Frontend (Auth)**: Provides the user interface for authentication, including login, registration, and profile management.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
