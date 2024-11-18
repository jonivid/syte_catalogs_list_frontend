import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/storage";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#121212"
      color="#ffffff"
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to Syte - Catalogs Project
      </Typography>
      <Typography variant="body1" color="textSecondary">
        You are successfully logged in. Explore the features of the Catalog
        Management Dashboard.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ marginTop: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
