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
   JWT_SECRET=YOUR_SECRET_KEY
   NODE_ENV=development
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   API_KEY=YourAPIKey
   FRONTEND_URL=http://localhost:3000
   ```

   > **Note:** Replace the placeholder values (e.g., `YOUR_SECRET_KEY`, `your-email@example.com`) with your actual details.

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
  - **Headers:**
    ```json
    {
      "x-api-key": "YourAPIKey"
    }
    ```
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
      "message": "User registered successfully"
    }
    ```

- **Authenticate a user and get a token**
  - **URL:** `/api/users/login`
  - **Method:** `POST`
  - **Headers:**
    ```json
    {
      "x-api-key": "YourAPIKey"
    }
    ```
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
      "Authorization": "Bearer jwt_token",
      "x-api-key": "YourAPIKey"
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
      "Authorization": "Bearer jwt_token",
      "x-api-key": "YourAPIKey"
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
      "Authorization": "Bearer jwt_token",
      "x-api-key": "YourAPIKey"
    }
    ```
  - **Body Parameters (Optional):**
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

#### Password Management

- **Forgot password (generate OTP)**
  - **URL:** `/api/users/forgotpassword`
  - **Method:** `POST`
  - **Headers:**
    ```json
    {
      "x-api-key": "YourAPIKey"
    }
    ```
  - **Body Parameters:**
    ```json
    {
      "email": "example@example.com"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "OTP sent"
    }
    ```

- **Reset password using OTP**
  - **URL:** `/api/users/resetpassword`
  - **Method:** `PUT`
  - **Headers:**
    ```json
    {
      "x-api-key": "YourAPIKey"
    }
    ```
  - **Body Parameters:**
    ```json
    {
      "otp": "123456",
      "newPassword": "newpassword",
      "email": "example@example.com"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Password reset successful"
    }
    ```

- **Validate Token**
  - **URL:** `/api/users/validateToken`
  - **Method:** `GET`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token",
      "x-api-key": "YourAPIKey"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Token is valid",
      "user": {
        "id": "user_id",
        "username": "exampleuser",
        "email": "example@example.com"
      }
    }
    ```

### Middleware

- **authMiddleware.js**: Protect routes by ensuring the user is authenticated.
- **errorMiddleware.js**: Handle errors and provide appropriate responses.
- **apiKeyMiddleware.js**: Ensures API requests include a valid API key for access control.
- **validators.js**: Contains validation rules for input data (located in the `middleware` directory).

### Models

- **userModel.js**: Define the User schema and password hashing logic.

### Controllers

- **userController.js**: Handle user registration, authentication, profile retrieval, password reset, and profile updates.

### Routes

- **userRoutes.js**: Define the API endpoints for user-related operations.

### Utilities

- **logger.js**: Configure and manage logging using `winston`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
