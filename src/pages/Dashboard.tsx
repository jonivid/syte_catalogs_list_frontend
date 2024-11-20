import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useAuth();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to Syte - Catalogs Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Hello, {username || "User"}! Here are your options:
      </Typography>

      <Grid container spacing={3}>
        {/* Card 1: View Catalogs */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#2d2d2d",
              color: "#ffffff",
            }}
          >
            <Typography variant="h6">Manage Catalogs</Typography>
            <Typography variant="body1" color="textSecondary">
              View and manage your catalogs here.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/catalogs")}
              sx={{ marginTop: 2 }}
            >
              Go to Catalogs
            </Button>
          </Paper>
        </Grid>

        {/* Card 2: Analytics (Placeholder for Future Feature) */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#2d2d2d",
              color: "#ffffff",
            }}
          >
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body1" color="textSecondary">
              View your catalog analytics and reports (Coming Soon).
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              disabled
              sx={{ marginTop: 2 }}
            >
              View Analytics
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#2d2d2d",
              color: "#ffffff",
            }}
          >
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body1" color="textSecondary">
              View your catalog analytics and reports (Coming Soon).
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              disabled
              sx={{ marginTop: 2 }}
            >
              View Analytics
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#2d2d2d",
              color: "#ffffff",
            }}
          >
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body1" color="textSecondary">
              View your catalog analytics and reports (Coming Soon).
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              disabled
              sx={{ marginTop: 2 }}
            >
              View Analytics
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Logout Button */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => (window.location.href = "/login")}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
