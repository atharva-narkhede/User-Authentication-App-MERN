
# Frontend (Auth)

This directory contains the frontend code for the MERN Auth Project, built with React.js and Bootstrap.

## Getting Started

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.
- **npm or yarn**: Package manager for installing dependencies. Use npm (comes with Node.js) or yarn.

### Installation

1. Clone the repository and navigate to the `auth` directory:
   ```sh
   cd auth
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the `auth` directory and add the following environment variable:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

   - `REACT_APP_API_URL`: This should point to the backend API server. By default, it's set to `http://localhost:5000`, which is the typical setup for local development.

### Running the Application

Start the React development server:
```sh
npm start
```

The application will start on `http://localhost:3000`.

### Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance.

### Features

- **User Registration**: Allows users to create a new account with basic credentials.
- **User Login**: Authenticates users and provides access to protected routes and features.
- **User Profile Management**: Enables users to view and update their profile information, including changing their password.
- **Responsive Design**: The application is fully responsive, adapting to various screen sizes and devices.
- **Form Validation**: Frontend form validations are implemented to enhance user experience and data integrity.
- **API Integration**: Seamlessly interacts with the backend API for handling authentication and user data.
- **State Management**: Efficiently manages authentication state across the application using React Context.

### Pages

#### Home Page

- **URL:** `/`
- **Description:** The main landing page of the application, providing an overview and navigation links.

#### Login Page

- **URL:** `/login`
- **Description:** Allows users to log in to their account.
- **Features:**
  - Login form with email and password fields.
  - Client-side validation for email and password.

#### Registration Page

- **URL:** `/register`
- **Description:** Allows users to create a new account.
- **Features:**
  - Registration form with username, email, password, and confirm password fields.
  - Real-time validation for form fields.

#### Profile Page

- **URL:** `/profile`
- **Description:** Allows logged-in users to view and update their profile information.
- **Features:**
  - Profile form with fields to update username, email, and password.
  - Password change functionality with confirmation.
  - Client-side validation and feedback.

### Components

#### Header Component

- **File:** `src/components/Header.js`
- **Description:** Navigation bar with links to different pages. It dynamically shows different links based on the user's authentication status.

#### AuthContext

- **File:** `src/context/AuthContext.js`
- **Description:** Context for managing and providing authentication state across the application. It includes methods for login, logout, and checking authentication status.

### Environment Variables

- **REACT_APP_API_URL**: The base URL for the backend API. Typically set to `http://localhost:5000` for local development.

### Contributing

Contributions are welcome! If you have suggestions for improvements or find a bug, feel free to open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

### Key Modifications:

1. **Added More Details**:
   - **API Integration**: Mentioned how the frontend interacts with the backend API.
   - **Form Validation**: Highlighted frontend form validation as a feature.
   - **State Management**: Mentioned the use of React Context for state management.

2. **Clarified Instructions**:
   - **Environment Variable**: Explained the purpose of `REACT_APP_API_URL`.
   - **Features**: Provided more context around features like form validation and state management.

3. **Enhanced Descriptions**:
   - Added additional explanations for pages and components to provide better insight into what each part of the app does.

