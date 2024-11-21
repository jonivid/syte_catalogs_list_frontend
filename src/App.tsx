import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "./style/theme";
import ErrorFallback from "./components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { getToken } from "./utils/storage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Catalogs from "./pages/Catalogs";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const token = getToken();
  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/catalogs"
                element={
                  <ProtectedRoute>
                    <Catalogs />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ThemeProvider>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
