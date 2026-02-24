// import React from "react";
import { Box, Container, Typography ,Grid} from "@mui/material";
// import Grid from "@mui/material/Grid2";

import sectionImage from "../assets/Frame.png";
import AppButton from "../components/common/AppButton";
import forthData from "../data/forthData.json";

interface ForthData {
  heading: string;
  description: string;
  buttonText: string;
}

function FourthSection() {
  const data: ForthData = forthData;

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#ffffff",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          {/* Left Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={sectionImage}
                alt="Pixelgrade"
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  height: "auto",
                  borderRadius: 2,
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.border = "2px solid red";
                }}
              />
            </Box>
          </Grid>

          {/* Right Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ maxWidth: 600 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "#1a2b3c",
                  mb: 3,
                  lineHeight: 1.3,
                }}
              >
                {data.heading}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#6c757d",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.7,
                  mb: 4,
                }}
              >
                {data.description}
              </Typography>

              <AppButton
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                {data.buttonText}
              </AppButton>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default FourthSection;