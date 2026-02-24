import  { useEffect, useState } from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import customer logos
import customer1 from "../assets/image.png";
import customer2 from "../assets/Logo.png";
import customer3 from "../assets/Logo(1).png";
import customer4 from "../assets/Logo(2).png";
import customer5 from "../assets/Logo(3).png";

/* ---------------- TYPES ---------------- */

interface SeventhData {
  testimonial: string;
  author: string;
  authorTitle: string;
  linkText?: string;
}

/* ---------------- COMPONENT ---------------- */

function SeventhSection() {
  const [data, setData] = useState<SeventhData | null>(null);

  useEffect(() => {
    import("../data/seventhData.json")
      .then((module) => {
        setData(module.default as SeventhData);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  const rightSideLogos = [customer2, customer3, customer4, customer5];

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
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Box
              component="img"
              src={customer1}
              alt="Main customer"
              sx={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                mx: "auto",
              }}
            />
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ flex: 1 }}>
            {/* Testimonial */}
            <Typography
              sx={{
                color: "#4a5568",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {data.testimonial}
            </Typography>

            {/* Author */}
            <Typography
              sx={{
                color: "#4CAF50",
                fontSize: "1.2rem",
                fontWeight: 600,
                mb: 1,
              }}
            >
              {data.author}
            </Typography>

            {/* Title */}
            <Typography
              sx={{
                color: "#89939e",
                fontSize: "1rem",
                mb: 4,
              }}
            >
              {data.authorTitle}
            </Typography>

            {/* Logos Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
                mb: 4,
              }}
            >
              {rightSideLogos.map((logo, index) => (
                <Box
                  key={index}
                  component="img"
                  src={logo}
                  alt={`Customer logo ${index + 2}`}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    opacity: 0.7,
                    transition: "0.3s",
                    "&:hover": { opacity: 1 },
                  }}
                />
              ))}
            </Box>

            {/* Link */}
            <Link
              href="#"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: "#4CAF50",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover .arrow-icon": {
                  transform: "translateX(4px)",
                },
              }}
            >
              {data.linkText ?? "Meet all customers"}
              <ArrowForwardIcon
                className="arrow-icon"
                sx={{ transition: "0.3s" }}
              />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SeventhSection;