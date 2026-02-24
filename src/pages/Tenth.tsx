import  { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import AppButton from "../components/common/AppButton";

/* ---------------- TYPES ---------------- */

interface TenthData {
  heading: string;
  buttonText?: string;
}

/* ---------------- COMPONENT ---------------- */

function NinthSection() {
  const [data, setData] = useState<TenthData | null>(null);

  useEffect(() => {
    import("../data/tenth.json")
      .then((module) => {
        setData(module.default as TenthData);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "#f5f7fa",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              color: "#1a2b3c",
              mb: 4,
              lineHeight: 1.2,
              maxWidth: 800,
            }}
          >
            {data.heading}
          </Typography>

          {/* Button */}
          <AppButton
            variant="contained"
            sx={{
              bgcolor: "#4CAF50",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: 600,
              py: 1.5,
              px: 4,
              borderRadius: 1,
              textTransform: "none",
            }}
          >
            {data.buttonText ?? "Get a Demo"}
          </AppButton>
        </Box>
      </Container>
    </Box>
  );
}

export default NinthSection;