import React, { useState } from "react";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const checkRes = await fetch(
        `http://localhost:5000/users?email=${formData.email}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      const newUser = {
        ...formData,
        avatar: "https://i.pravatar.cc/150?img=3",
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      setSuccessOpen(true);
      setLoading(false);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
  console.error(err);
  setError("Server error. Make sure JSON server is running.");
  setLoading(false);
}
  };

  // ✅ Google Login Handler
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      setError("Google login failed");
      return;
    }

    const decoded = jwtDecode<GoogleUser>(
      credentialResponse.credential
    );

    const googleUser = {
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture,
    };

    try {
      // Prevent duplicate Google users
      const checkRes = await fetch(
        `http://localhost:5000/users?email=${decoded.email}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length === 0) {
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(googleUser),
        });
      }

      navigate("/dashboard");
    } catch {
      setError("Google login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#e8f5e9",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
              color: "#4CAF50",
            }}
          >
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              color="success"
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              color="success"
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              color="success"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: "right", mb: 2 , color:"#4CAF50"}}>
              <Link component="button" underline="hover" color="success.main">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
            //   color="success"
              disabled={loading}
              sx={{ mb: 2, background:"#4CAF50" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* ✅ Professional Google Login */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
            />
          </Box>

          <Typography textAlign="center">
            Already have an account?{" "}
            <Link
              component="button"
              color="success.main"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Container>

      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        message="Registered Successfully!"
      />
    </Box>
  );
}

export default Register;