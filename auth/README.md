# Frontend (Auth)

This directory contains the frontend code for the MERN Auth Project, built with React.js and Bootstrap.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Navigate to the `auth` directory:
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

### Running the Application

Start the React development server:
```sh
npm start
```

The application will start on `http://localhost:3000`.


### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.

### Features

- **User Registration**: Allows users to create a new account.
- **User Login**: Authenticates users and provides access to protected routes.
- **User Profile Management**: Allows users to view and update their profile information.
- **Responsive Design**: The application is responsive and works on different screen sizes.

### Pages

#### Home Page

- **URL:** `/`
- **Description:** The main landing page of the application.

#### Login Page

- **URL:** `/login`
- **Description:** Allows users to log in to their account.
- **Features:**
  - Login form with email and password fields.

#### Registration Page

- **URL:** `/register`
- **Description:** Allows users to create a new account.
- **Features:**
  - Registration form with username, email, password, and confirm password fields.

#### Profile Page

- **URL:** `/profile`
- **Description:** Allows logged-in users to view and update their profile information.
- **Features:**
  - Profile form with username, email, and password fields.
  - Update profile button.

### Components

#### Header Component

- **File:** `src/components/Header.js`
- **Description:** Navigation bar with links to different pages and authentication actions.

#### AuthContext

- **File:** `src/context/AuthContext.js`
- **Description:** Context for managing authentication state and providing it to other components.

### Environment Variables

- **REACT_APP_API_URL**: The URL of the backend API. Example: `http://localhost:5000`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
