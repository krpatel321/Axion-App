import  { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import panaImage from "../assets/pana.png";

/* ---------------- TYPES ---------------- */

interface SixthData {
  heading: string;
  description: string;
  buttonText?: string;
}

/* ---------------- COMPONENT ---------------- */

function FooterSection() {
  const [data, setData] = useState<SixthData | null>(null);

  useEffect(() => {
    import("../data/sixthData.json")
      .then((module) => {
        setData(module.default as SixthData);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "#ffffff",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* LEFT - Image */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={panaImage}
              alt="Footer design illustration"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: 500,
                mx: "auto",
                display: "block",
              }}
            />
          </Box>

          {/* RIGHT - Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
                color: "#1a2b3c",
                mb: 3,
              }}
            >
              {data.heading}
            </Typography>

            <Typography
              sx={{
                color: "#6c757d",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {data.description}
            </Typography>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#4CAF50",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 600,
                py: 1.5,
                px: 4,
                borderRadius: 1,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#45a049",
                },
              }}
            >
              {data.buttonText ?? "Learn More"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default FooterSection;