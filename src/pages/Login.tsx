import React, { useState } from "react";
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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  // ✅ LOGIN
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const users: User[] = await res.json();

      if (users.length === 0) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(users[0]));
      navigate("/dashboard");
    } catch {
      setError("Server error. Make sure JSON server is running.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot Password
  const handleForgotPassword = () => {
    if (!formData.email) {
      setError("Enter your email first");
      return;
    }

    alert("Password reset link sent (Demo only)");
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/users?email=googleuser@gmail.com`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const users: User[] = await res.json();

      if (users.length === 0) {
        setError("Google user not registered. Please register first.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(users[0]));
      navigate("/dashboard");
    } catch {
      setError("Server error. Make sure JSON server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fa",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Welcome Back
            </Typography>
            <Typography color="#6c757d">
              Please enter your details to sign in
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
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

            <Box textAlign="right" mb={3}>
              <Link
                component="button"
                onClick={handleForgotPassword}
                underline="hover"
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#4CAF50",
                fontWeight: 600,
                py: 1.5,
                mb: 2,
                "&:hover": { bgcolor: "#45a049" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            Continue with Google
          </Button>

          <Box textAlign="center">
            <Typography color="#6c757d">
              Don't have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;