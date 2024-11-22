import React from "react";
import { Box, Typography, Button, Grid, Paper, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useAuth();

  return (
    <Box sx={{ padding: 3 }}>
      {/* Page Header */}
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to Syte - Catalogs Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Hello, {username || "User"}! Here are your options:
      </Typography>

      {/* Features Section */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ marginTop: 2 }}>
        {/* Card 1: View Catalogs */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#2d2d2d",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#3d3d3d" },
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

        {/* Card 2: Discover Page */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#2d2d2d",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#3d3d3d" },
            }}
          >
            <Typography variant="h6">Visual Discovery</Typography>
            <Typography variant="body1" color="textSecondary">
              Help shoppers instantly find items they want with an inspiring
              visual search experience, powered by AI (Coming Soon).
            </Typography>
            <Tooltip title="This feature is coming soon!" arrow>
              <span>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled
                  sx={{ marginTop: 2 }}
                >
                  Explore More
                </Button>
              </span>
            </Tooltip>
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
              "&:hover": { backgroundColor: "#3d3d3d" },
            }}
          >
            <Typography variant="h6">AI Tagging and Merchandising</Typography>
            <Typography variant="body1" color="textSecondary">
              Drive Efficiency & Enrich Catalogue Data With Automatic Product
              Tagging (Coming Soon).
            </Typography>
            <Tooltip title="This feature is coming soon!" arrow>
              <span>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled
                  sx={{ marginTop: 2 }}
                >
                  Explore More
                </Button>
              </span>
            </Tooltip>
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
