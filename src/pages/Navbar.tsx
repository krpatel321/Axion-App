import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import menuItems from "../data/menu.json";
import logo from "../assets/Icon.png";
import AppButton from "../components/common/AppButton";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItemType {
  id: number;
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #eaeef2",

          // ✅ Remove yellow focus outline inside navbar
          "& *:focus": {
            outline: "none",
          },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              px: { xs: 2, sm: 3, md: 0 },
              minHeight: { xs: 64, sm: 70, md: 80 },
            }}
          >
            {/* Logo */}
            <Box
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                cursor: "pointer",
                flexGrow: 1,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                  height: { xs: 30, sm: 36, md: 42 },
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#1a2b3c",
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                  },
                }}
              >
                Axion
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: { md: 2, lg: 3 },
              }}
            >
              {menuItems.map((item: MenuItemType) => {
                const isActive = location.pathname === item.path;

                return (
                  <Button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: { md: "0.9rem", lg: "1rem" },
                      color: isActive ? "#4CAF50" : "#4a5568",
                      position: "relative",
                      px: 1,

                      "&:hover": {
                        bgcolor: "transparent",
                        color: "#4CAF50",
                      },

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -4,
                        height: "2px",
                        width: isActive ? "100%" : "0%",
                        bgcolor: "#4CAF50",
                        transition: "width 0.3s ease",
                      },

                      "&:hover::after": {
                        width: "100%",
                      },

                      // ✅ Remove focus outline
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              <AppButton
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: "#4CAF50",
                  color: "white",
                  fontWeight: 600,
                  px: { md: 2, lg: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { md: "0.9rem", lg: "1rem" },

                  "&:hover": {
                    bgcolor: "#45a049",
                  },

                  // ✅ Remove focus outline
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                Register
              </AppButton>
            </Box>

            {/* Mobile Controls */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "85%", sm: 300 },
            px: 2,
            py: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List>
          {menuItems.map((item: MenuItemType) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: isActive ? "#e8f5e9" : "transparent",

                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#4CAF50" : "#4a5568",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="contained"
          onClick={() => handleNavigation("/register")}
          sx={{
            bgcolor: "#4CAF50",
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,

            "&:hover": {
              bgcolor: "#45a049",
            },

            // ✅ Remove focus outline
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&.Mui-focusVisible": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          Register
        </Button>
      </Drawer>
    </>
  );
};

export default Navbar;