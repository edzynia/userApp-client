# User App Project Documentation

https://user-app-client-l06s62fpj-echerevkos-projects.vercel.app/

## Overview

This project is a React-based application with a simple Express - Node.js server. It allows users to view, edit, and manage their profiles, authenticate via login, and perform API operations. This documentation covers the user stories, project structure, API details, deployment instructions, and design considerations.

The client application employs straightforward solutions using RTK and saves data to local storage. The main API endpoints, including token generation, are handled by the server application.

The initial requirement was to build a simple application using React. However, since JWT tokens are inherently generated on the backend for secure authentication and authorization, I decided to implement a simple server to handle this functionality. As the requirements specified implementing authorization via email and password, the server uses mocked data for this purpose. Additionally, I migrated all API endpoints to the server to centralize data handling, enhance the application’s architecture, and improve overall security.

Requirements: [PDF Document](<./Qred%20-%20React%20Frontend%20Developer%20-%20Case%20study%20(1).pdf>)

---

## Used Technologies

- React
- Node.js
- Express
- TypeScript
- REST API
- RTK

## User Stories

### 1. User List View

- **As an admin**, I want to view a list of all users in the system.

### 2. User Profile Management

- **As a user**, I want to view my profile details on a dedicated page.
- **As a user**, I want to edit my profile details, such as email and phone number...
- **As a user**, I want to save my changes and see validation errors for invalid inputs.

### 3. Authentication

- **As a user**, I want to log in using my email and password.
- **As a user**, I want to receive a token upon successful login for secure API interactions.

---

## Project Structure

### Client (Frontend)

- **Components:** Reusable UI components (e.g., forms, buttons, modals).
  - `Header.tsx`: Displays the application header with navigation.
  - `LoginForm.tsx`: User login form.
  - `UserList.tsx`: Displays a list of users.
  - `UserProfile.tsx`: User profile view and editing form.
- **Redux:** State management for authentication and user data.
  - `authSlice.ts`: Handles authentication logic.
  - `userSlice.ts`: Handles user data fetching and updates.
- **Utilities:** Common utility functions.
  - `apiUrls.ts`: Centralized API endpoint management.
  - `validationUtils.ts`: Validation logic for forms.
- **Styling:** Tailwind CSS for consistent and responsive designs.

### Server (Backend)

- **Controllers:**
  - `authController.ts`: Handles login and token generation.
  - `userController.ts`: Handles user CRUD operations.
- **Routes:**
  - `authRoutes.ts`: Routes for authentication.
  - `userRoutes.ts`: Routes for user management.
- **Middleware:**
  - `authenticateToken.ts`: Middleware for token verification.
- **Services:**
  - `userService.ts`: Business logic for user operations.
- **Environment Configuration:**
  - `.env`: Contains sensitive keys like `SECRET_KEY` and API URLs.

---

## API Endpoints

### Authentication

- **POST `/api/auth/login`**
  - **Request Body:** `{ email: string, password: string }`
  - **Response:** `{ token: string, userId: number }`

### User Management

- **GET `/api/users`**

  - **Response:** `[{ id, name, email, ... }]`

- **GET `/api/users/:id`**

  - **Response:** `{ id, name, email, ... }`

- **PUT `/api/users/:id`**
  - **Request Body:** `{ name, email, phone, ... }`
  - **Response:** `{ id, name, email, ... }`

---

## Deployment Instructions

### Prerequisites

- Node.js and npm installed.
- Git installed.

### Backend Deployment (Server)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   npm run start
   ```
5. Deploy to Vercel:
   - Ensure `dist` is set as the output directory.
   - Configure `vercel.json` with the following:
     ```json
     {
       "version": 2,
       "builds": [{ "src": "dist/server.js", "use": "@vercel/node" }],
       "routes": [{ "src": "/api/(.*)", "dest": "dist/server.js" }]
     }
     ```

### Frontend Deployment (Client)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-app-to-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Deploy to Vercel:
   - Configure `vercel.json` with:
     ```json
     {
       "version": 2,
       "builds": [{ "src": "build", "use": "@vercel/static" }]
     }
     ```

---

## CSS Design

- **Framework:** Tailwind CSS
- **Structure:**
  - Utility-first approach for rapid UI development.
  - Responsive and laptop-friendly layouts.

---

## Error Handling

- Form validation errors display inline with appropriate messages.
- API errors are caught and displayed in a global notification system.
- Retry logic for transient API failures.

---

## Future Enhancements

- Add pagination to the user list.
- Improve security by implementing HTTPS-only cookies for token storage.
- Use UI components.
- Implement CI/CD pipeline for automated testing and deployment.
- Extend business logic testing to include edge cases and error scenarios.
- Migrate mock user data to a dynamic database setup for scalability.
- Add real-time notifications for user updates.
- Implement dark mode for the frontend UI.
- Enhance form validation with more detailed rules and suggestions for correction.
- Create unit tests for critical frontend and backend components.
- Explore GraphQL for more flexible API queries.
