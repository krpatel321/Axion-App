import  { useState, useEffect } from "react";
import heroData from "../data/heroData.json";
import heroImage from "../assets/Illustration.png";
import AppButton from "../components/common/AppButton";
import {
  Box,
  Grid,
  Typography,
  Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HeroData {
  heading: string;
  subheading: string;
  buttonText: string;
}

function HeroSection() {
  const navigate = useNavigate();
  const slides: HeroData[] = heroData;

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Auto slide every 10 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const data = slides[currentSlide];

  const words = data.heading.split(" ");
  const midPoint = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, midPoint).join(" ");
  const secondLine = words.slice(midPoint).join(" ");

  return (
    <Box
      sx={{
        minHeight: "100vh",
         pt: { xs: "64px", sm: "70px", md: "80px" },
        width: "100%",
        display: "flex",
        alignItems: "center",
        bgcolor: "#f5f7fa",
        py: { xs: 4, md: 0 },
        transition: "opacity 0.5s ease"
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ maxWidth: 600 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: 1.2,
                  mb: 2
                }}
              >
                <Box component="span" sx={{ color: "#1a2b3c" }}>
                  {firstLine}
                </Box>
                <br />
                <Box component="span" sx={{ color: "#4CAF50", mt: 1 }}>
                  {secondLine}
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.6,
                  opacity: 0.8
                }}
              >
                {data.subheading}
              </Typography>

              <AppButton
                onClick={() => navigate("/register")}
                sx={{
                  backgroundColor: "#4CAF50",
                  px: 5,
                  py: 1.8,
                  borderRadius: "8px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 16px rgba(76, 175, 80, 0.2)",
                  "&:hover": {
                    backgroundColor: "#45a049"
                  }
                }}
              >
                {data.buttonText}
              </AppButton>
            </Box>
          </Grid>

          {/* RIGHT IMAGE */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box display="flex" justifyContent="center">
              <Box
                component="img"
                src={heroImage}
                alt="Hero Illustration"
                sx={{
                  width: "100%",
                  maxWidth: 650,
                  objectFit: "contain"
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* ✅ DOT INDICATORS */}
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          gap={1.5}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: currentSlide === index ? 14 : 10,
                height: currentSlide === index ? 14 : 10,
                borderRadius: "50%",
                bgcolor: currentSlide === index ? "#4CAF50" : "#cfd8dc",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </Box>

      </Container>
    </Box>
  );
}

export default HeroSection;