// import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import featuresData from "../data/featuresData.json";

// Import feature icons
import feature1 from "../assets/Logo.png";
import feature2 from "../assets/Logo(1).png";
import feature3 from "../assets/Logo(2).png";
import feature4 from "../assets/Logo(3).png";
import feature5 from "../assets/Logo(4).png";
import feature6 from "../assets/Logo(5).png";

/* ========= TYPES ========= */

interface Feature {
  title: string;
  description: string;
}

interface FeaturesData {
  heading: string;
  subheading: string;
  features: Feature[];
  ctaTitle: string;
  ctaDescription: string;
}

const data: FeaturesData = featuresData;

/* ========= COMPONENT ========= */

function Features() {
  const featureIcons = [
    feature1,
    feature2,
    feature3,
    feature4,
    feature5,
    feature6,
  ];

  return (
    <Box
      sx={{
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
        bgcolor: "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        {/* ===== Header ===== */}
        <Box textAlign="center" mb={10}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "#4CAF50", mb: 3 }}
          >
            {data.heading}
          </Typography>

          <Typography
            sx={{
              color: "#6c757d",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            {data.subheading}
          </Typography>
        </Box>

        {/* ===== Features Grid ===== */}
        <Grid container spacing={5}>
          {data.features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  background: "white",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={featureIcons[index]}
                  alt={feature.title}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 3,
                  }}
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 2, color: "#1a2b3c" }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6c757d",
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ===== CTA Section ===== */}
        <Box
          sx={{
            mt: 14,
            p: { xs: 4, md: 8 },
            borderRadius: 5,
            textAlign: "center",
            background: "linear-gradient(135deg,#1a2b3c,#2d4a63)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={3}>
            {data.ctaTitle}
          </Typography>

          <Typography
            sx={{
              maxWidth: 650,
              mx: "auto",
              opacity: 0.9,
              lineHeight: 1.8,
            }}
          >
            {data.ctaDescription}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Features;