# Employee Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing employee information with authentication and role-based access control.

## Features

- **User Authentication**: Secure login and registration system
- **Role-Based Access**: Different permissions for admin and regular users
- **Employee Management**: Add, view, update, and delete employee records
- **File Uploads**: Support for employee document uploads
- **Responsive Design**: Works on various screen sizes

## Tech Stack

### Frontend
- React (with Vite)
- React Router (for navigation)
- Context API (for state management)
- Axios (for API calls)
- Tailwind CSS (for styling)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT (for authentication)
- Bcrypt (for password hashing)
- Multer (for file uploads)
- Express Validator (for request validation)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the `backend` directory:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     ```
   - Create a `.env` file in the `frontend` directory:
     ```
     VITE_API_BASE_URL=http://localhost:5000/api
     ```

5. Start the development servers
   ```bash
   # From backend directory
   npm run dev
   
   # From frontend directory (in a new terminal)
   cd frontend
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) to view the application.

## Project Structure

```
employee-management-system/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Authentication and validation middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   ├── app.js         # Express app configuration
│   │   └── server.js      # Server entry point
│   └── uploads/           # Uploaded files
├── frontend/
│   ├── public/        # Static files
│   └── src/
│       ├── assets/    # Images and other assets
│       ├── components/# Reusable UI components
│       ├── constants/ # Application constants
│       ├── context/   # React context providers
│       ├── hooks/     # Custom React hooks
│       ├── layout/    # Layout components
│       ├── pages/     # Page components
│       ├── routes/    # Route definitions
│       ├── services/  # API service functions
│       ├── utils/     # Utility functions
│       ├── App.jsx    # Main App component
│       └── main.jsx   # Application entry point
├── .gitignore
└── README.md
```

## Available Scripts

### Backend
- `npm run dev` - Start the development server with hot-reload
- `npm start` - Start the production server

### Frontend
- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

