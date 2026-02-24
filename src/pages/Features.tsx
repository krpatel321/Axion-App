import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
} from "@mui/material";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

import featuresData from "../data/featuresData.json";

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
    <PeopleAltOutlinedIcon fontSize="large" />,
    <AnalyticsOutlinedIcon fontSize="large" />,
    <SecurityOutlinedIcon fontSize="large" />,
    <ApiOutlinedIcon fontSize="large" />,
    <DevicesOutlinedIcon fontSize="large" />,
    <SupportAgentOutlinedIcon fontSize="large" />,
  ];

  return (
    <Box
      sx={{
        pt: { xs: 12, md: 16 },
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
        <Grid container rowSpacing={6} columnSpacing={5}>
          {data.features.map((feature, index) => (
            <Grid  size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  textAlign: "center",
                  background: "#ffffff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  px: 4,
                  py: 2,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,#e8f5e9,#f1f8e9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    color: "#4CAF50",
                    transition: "all 0.3s ease",
                  }}
                >
                  {featureIcons[index]}
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 2, color: "#1a2b3c" }}
                >
                  {feature.title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    color: "#6c757d",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  {feature.description}
                </Typography>
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
            boxShadow:1.7,
            textAlign: "center",
            background:
              "white",
            color: "black",
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