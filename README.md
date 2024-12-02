
# Full-Stack Application with React, Node.js, Express, MongoDB, and Swagger UI

## Description

This project is a full-stack web application consisting of a **frontend** built with **React** and a **backend** built with **Node.js** and **Express.js**. The backend is connected to a **MongoDB** database using **Mongoose**. Swagger UI is integrated into the backend to provide an interactive API documentation. The application is designed to manage employees and users through a RESTful API.

---

## Project Structure

```
/assignment-2
│
├── /client                 # React frontend application
├── /backend                # Node.js backend API
│   ├── /models             # Mongoose models for MongoDB
│   ├── /routes             # Express.js route handlers
│   ├── /middleware         # Custom middleware (e.g., error handling)
│   └── index.js           # Entry point for the backend
│
├── .env                    # Environment variables
├── package.json            # Backend dependencies and scripts
├── README.md               # Main README
└── /client/README.md       # Frontend README 
```

---

## Technologies Used

### Frontend:
- **React.js** for building the user interface
- **Axios** for making HTTP requests to the backend API
- **Tailwind CSS** for styling the frontend components

### Backend:
- **Node.js** and **Express.js** for building the server
- **MongoDB** with **Mongoose** for data storage and querying
- **Swagger UI** for API documentation and testing
- **CORS** for enabling cross-origin requests
- **dotenv** for environment variable management
- **Error-handling middleware**

---

## Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (local or Atlas instance)

---

## Backend Setup

### 1. Clone the repository
```bash
git clone https://github.com/cozimo-davinci/apex_management_system.git
```

### 2. Navigate to the backend directory
```bash
cd backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure environment variables
Create a `.env` file in the `backend` directory with the following contents:
```bash
PORT=3002
MONGO_URI=your_mongodb_connection_string
```

### 5. Start the backend server
```bash
npm start
```

The backend API will be running on `http://localhost:3002`.

- **Swagger Documentation**: Navigate to `http://localhost:3002/api-docs` to view and test the API using Swagger UI.

---

## Frontend Setup

### 1. Navigate to the frontend directory
```bash
cd client
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `client` directory with the following contents:
```bash
REACT_APP_API_URL=http://localhost:3002/api/v1
```

This will define the base URL for making API requests to the backend.

### 4. Start the React development server
```bash
npm start
```

The React app will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. Employee Endpoints

- **GET** `/api/v1/emp` – Fetch all employees
- **GET** `/api/v1/emp/{id}` – Fetch a single employee by ID
- **POST** `/api/v1/emp` – Create a new employee
- **PUT** `/api/v1/emp/{id}` – Update an employee by ID
- **DELETE** `/api/v1/emp/{id}` – Delete an employee by ID

### 2. User Endpoints

- **GET** `/api/v1/user` – Fetch all users
- **GET** `/api/v1/user/{id}` – Fetch a single user by ID
- **POST** `/api/v1/user` – Create a new user
- **PUT** `/api/v1/user/{id}` – Update an existing user by ID
- **DELETE** `/api/v1/user/{id}` – Delete a user by ID

---

## API Documentation with Swagger UI

- The backend is integrated with **Swagger UI** for interactive API documentation.
- Access Swagger UI at `http://localhost:3002/api-docs` to explore the API and try out the endpoints directly in the browser.

---

## Error Handling

The backend has custom **error-handling middleware** that captures any errors during API execution and returns them in a structured format with appropriate HTTP status codes.

---

## Security

- **CORS** is enabled to allow cross-origin requests.
- Sensitive information like MongoDB URI and JWT secrets should be stored securely in the `.env` file.

---

## Deployment

You can deploy the frontend and backend on platforms like **Heroku**, **Netlify**, or **Vercel**.

- For the backend, make sure to set environment variables (like `MONGO_URI`) properly on the hosting platform.
- For the frontend, ensure that the `REACT_APP_API_URL` is correctly pointing to the backend URL in the production environment.

---

## Troubleshooting

- **"Failed to connect to MongoDB"**: Ensure the MongoDB connection string in the `.env` file is correct and MongoDB is accessible.
- **"CORS error"**: If you're accessing the API from a different domain, ensure CORS is properly configured in the backend.
- **"Swagger UI not loading"**: Ensure the `swagger-jsdoc` and `swagger-ui-express` dependencies are correctly installed.


---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
