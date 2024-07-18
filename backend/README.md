# Backend

This directory contains the backend code for the MERN Auth Project, built with Node.js, Express.js, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/auth
   JWT_SECRET=GITHUB
   NODE_ENV=development
   ```

### Running the Server

Start the development server:
```sh
node server
```

The server will start on `http://localhost:5000`.

### Dependencies

The following libraries are used in the backend for secure authentication and other functionalities:

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

### API Endpoints

#### Authentication

- **Register a new user**
  - **URL:** `/api/users/register`
  - **Method:** `POST`
  - **Body Parameters:**
    ```json
    {
      "username": "exampleuser",
      "email": "example@example.com",
      "password": "password"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "user_id",
      "username": "exampleuser",
      "email": "example@example.com",
      "token": "jwt_token"
    }
    ```

- **Authenticate a user and get a token**
  - **URL:** `/api/users/login`
  - **Method:** `POST`
  - **Body Parameters:**
    ```json
    {
      "email": "example@example.com",
      "password": "password"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "user_id",
      "username": "exampleuser",
      "email": "example@example.com",
      "token": "jwt_token"
    }
    ```

- **Logout a user**
  - **URL:** `/api/users/logout`
  - **Method:** `POST`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **Get the logged-in user's profile**
  - **URL:** `/api/users/profile`
  - **Method:** `GET`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "user_id",
      "username": "exampleuser",
      "email": "example@example.com"
    }
    ```

- **Update the logged-in user's profile**
  - **URL:** `/api/users/profile`
  - **Method:** `PUT`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Body Parameters:**
    ```json
    {
      "username": "newusername",
      "email": "newemail@example.com",
      "password": "newpassword"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "user_id",
      "username": "newusername",
      "email": "newemail@example.com",
      "token": "new_jwt_token"
    }
    ```

### Middleware

- **authMiddleware.js**: Protect routes by ensuring the user is authenticated.
- **errorMiddleware.js**: Handle errors and provide appropriate responses.

### Models

- **userModel.js**: Define the User schema and password hashing logic.

### Controllers

- **userController.js**: Handle user registration, authentication, profile retrieval, and profile updates.

### Routes

- **userRoutes.js**: Define the API endpoints for user-related operations.

### Utilities

- **logger.js**: Configure and manage logging.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
