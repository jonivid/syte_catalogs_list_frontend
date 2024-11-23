# **Catalog Management Frontend**

## Introduction

The **Catalog Management Frontend** is a React + TypeScript application designed to interact with the Catalog Management Backend. It provides users with features such as authentication, catalog management, and a responsive, user-friendly interface. The application is containerized with Docker, ensuring easy deployment and scalability.

---

## Technology Stack

- **React**: For building user interfaces.
- **TypeScript**: Ensures static typing and better code maintainability.
- **MUI (Material-UI)**: For a responsive and modern design system.
- **React Router**: For routing and navigation.
- **Axios**: For HTTP requests to the backend API.
- **React Query**: Handles API data fetching and caching.
- **Styled Components**: For custom, reusable styling.
- **React Hook Form**: For form handling and validation.

---

## Features

1. **Authentication**:

   - JWT-based login system.
   - Role-based access using context and state management.

2. **Catalog Management**:

   - View paginated and searchable catalogs in a table format.
   - Add new catalogs with a form dialog.
   - Update existing catalogs.
   - Delete catalogs individually or in bulk.

3. **Reusable Components**:

   - **GenericTable**: Dynamic tables for displaying catalog data.
   - **ErrorBoundary**: Graceful error handling for components.
   - **NavBar**: Navigation bar for seamless navigation between routes.

4. **Theming and Custom Styles**:
   - Dynamic theming with Material-UI and styled-components.

---

## Directory Structure

```plaintext
syte_catalogs_list_frontend/
├── src/                       # Source code
│   ├── components/            # Reusable UI components
│   │   ├── CatalogDialog.tsx   # Dialog for adding/editing catalogs
│   │   ├── ErrorBoundary.tsx   # Error boundary for graceful error handling
│   │   ├── GenericTable.tsx    # Generic table component
│   │   ├── MainLayout.tsx      # Layout for the application
│   │   ├── NavBar.tsx          # Navigation bar component
│   ├── pages/                 # Page-level components
│   │   ├── Catalogs.tsx        # Catalogs management page
│   │   ├── Dashboard.tsx       # Dashboard overview
│   │   ├── Home.tsx            # Home page
│   │   ├── Login.tsx           # Login page
│   │   ├── NotFound.tsx        # 404 Not Found page
│   ├── context/               # Context for global state
│   │   ├── AuthContext.tsx     # Authentication context provider
│   ├── services/              # API service handlers
│   │   ├── auth.ts             # Authentication API calls
│   │   ├── catalogService.ts   # Catalog API calls
│   │   ├── axiosInstance.ts    # Axios configuration
│   ├── utils/                 # Utility functions and helpers
│   │   ├── storage.ts          # Local storage helpers
│   │   ├── utilsFunctions.ts   # General utility functions
│   ├── styles/                # Theming and styling
│   │   ├── theme.ts            # MUI theme configuration
│   │   ├── styledComponents.ts # Styled-components configuration
│   ├── App.tsx                # Main application component
├── .env                       # Environment variables file
├── Dockerfile                 # Docker configuration
├── nginx.conf                 # Nginx configuration
```

---

## Installation and Setup

### Prerequisites

- **Docker** and **Docker Compose** installed.

---

### Environment Variables

Create a `.env` file in the project root with the following content:

```plaintext
VITE_API_URL=http://localhost:8001
```

---

### Running Locally Without Docker

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start the Development Server**:

   ```bash
   npm run dev
   ```

3. **Access the Application**:
   The application will be running at:
   ```plaintext
   http://localhost:3000
   ```

---

### Docker Setup

#### Dockerfile

Ensure the following `Dockerfile` is present in the project root:

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

#### Docker Compose

Add the following service to your `docker-compose.yml` file:

```yaml
frontend:
  build:
    context: ./syte_catalogs_list_frontend
    dockerfile: Dockerfile
    args:
      VITE_API_URL: ${VITE_API_URL}
  ports:
    - "3000:80"
  env_file:
    - .env
  depends_on:
    - backend
  networks:
    - syte_network
```

#### Starting the Services

1. Run the following command from the project root containing `docker-compose.yml`:

   ```bash
   docker-compose up --build
   ```

2. Access the frontend at:
   ```plaintext
   http://localhost:3000
   ```

---

## Scripts

The following scripts are defined in `package.json`:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run preview`**: Serves the production build locally.
- **`npm run lint`**: Runs ESLint to identify code issues.

---

## Pages Overview

1. **Home Page** (`/`):

   - A landing page for the application.

2. **Login Page** (`/login`):

   - Handles user authentication and redirects to the dashboard upon success.

3. **Dashboard** (`/dashboard`):

   - Provides an overview of catalog data.

4. **Catalogs** (`/catalogs`):

   - Displays a paginated list of catalogs.
   - Allows CRUD operations on catalogs.

5. **Not Found** (`/*`):
   - A fallback 404 page for undefined routes.

---

## Conclusion

The **Catalog Management Frontend** provides a robust and user-friendly interface for managing catalogs. With React and TypeScript, it ensures scalability, maintainability, and seamless integration with the backend API.

Feel free to contribute, report issues, or suggest new features! Let me know if further clarifications are needed.
