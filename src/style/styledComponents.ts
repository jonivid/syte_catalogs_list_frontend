import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "#ffffff", // Default text color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2979ff", // Border color
    },
    "&:hover fieldset": {
      borderColor: "#5393ff", // Hover border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2979ff", // Focused border color
    },
  },
  // Fix autofill background and text color using camelCase
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #2d2d2d inset",
    WebkitTextFillColor: "#ffffff",
  },
  // Ensure the text color stays white when focused
  "&.Mui-focused .MuiInputBase-input": {
    color: "#ffffff",
  },
}));

export default StyledTextField;
