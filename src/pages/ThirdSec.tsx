import  { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import membershipIcon from "../assets/Icon(1).png";
import associationIcon from "../assets/Icon(2).png";
import clubsIcon from "../assets/Icon(3).png";

/* ---------------- TYPES ---------------- */

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: "Icon(1).png" | "Icon(2).png" | "Icon(3).png";
  color: string;
}

interface CommunityData {
  heading: string;
  subheading: string;
  features: Feature[];
}

/* ---------------- STYLED COMPONENTS ---------------- */

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
}));

// ✅ Properly typed custom prop
interface IconWrapperProps {
  bgColor: string;
}

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<IconWrapperProps>(({ theme, bgColor }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  backgroundColor: `${bgColor}15`,
}));

/* ---------------- COMPONENT ---------------- */

function CommunitySection() {
  const [data, setData] = useState<CommunityData | null>(null);

  useEffect(() => {
    import("../data/thirdSec.json")
      .then((module) => {
        setData(module.default as CommunityData); // ✅ cast properly
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const iconMap: Record<Feature["icon"], string> = {
    "Icon(1).png": membershipIcon,
    "Icon(2).png": associationIcon,
    "Icon(3).png": clubsIcon,
  };

  if (!data) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            {data.heading}
          </Typography>
          <Typography variant="h5" sx={{ color: "#6c757d" }}>
            {data.subheading}
          </Typography>
        </Box>

        {/* Features */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {data.features.map((feature) => (
            <Box
              key={feature.id}
              sx={{
                flex: { md: 1 },
                minWidth: 0,
              }}
            >
              <FeatureCard elevation={0}>
                <IconWrapper bgColor={feature.color}>
                  <Box
                    component="img"
                    src={iconMap[feature.icon]}
                    alt={feature.title}
                    sx={{ width: 50, height: 50, objectFit: "contain" }}
                  />
                </IconWrapper>

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {feature.title}
                </Typography>

                <Typography variant="body1" sx={{ color: "#6c757d" }}>
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default CommunitySection;