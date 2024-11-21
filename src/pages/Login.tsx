import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "../api/auth";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import StyledTextField from "../style/styledComponents";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUsername } = useAuth();

  // Form submission handler
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await login(data);
      const { username, accessToken } = response;

      setToken(accessToken);
      setUsername(username);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#121212",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#1d1d1d",
        }}
      >
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          Syte - Catalogs Project
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Welcome!
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#ffffff" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              bgcolor: "#2979ff",
              color: "#ffffff",
              "&:hover": {
                bgcolor: "#5393ff",
              },
            }}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
