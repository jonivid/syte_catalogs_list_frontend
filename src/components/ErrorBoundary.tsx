import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Button, Typography, Box } from "@mui/material";

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "20px", color: "#ffffff" }}>
      <Typography variant="h5" color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1">{error.message}</Typography>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </Box>
  );
};

export default ErrorFallback;
