import  { useEffect, useState } from "react";
import { Box, Container, Typography, Link, Card, CardMedia, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import blog images
import blog1 from "../assets/E.png";
import blog2 from "../assets/E(1).png";
import blog3 from "../assets/E(2).png";

interface Post {
  title: string;
}

interface EighthSectionData {
  heading: string;
  description: string;
  posts: Post[];
}

function EighthSection() {
  const [data, setData] = useState<EighthSectionData | null>(null);

  useEffect(() => {
    import("../data/eighthData.json")
      .then((module) => setData(module.default))
      .catch((error) => console.error("Error loading data:", error));
  }, []);


  if (!data) return null;

  const blogImages = [blog1, blog2, blog3];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "#ffffff",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              color: "#1a2b3c",
              mb: 2,
            }}
          >
            {data.heading}
          </Typography>

          <Typography
            sx={{
              color: "#6c757d",
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            {data.description}
          </Typography>
        </Box>

        {/* Blog Posts Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 6,
            pb:6
          }}
        >
          {data.posts.map((post, index) => (
            <Card
  key={index}
  sx={{
    position: "relative",
    borderRadius: 3,
    overflow: "visible",
    boxShadow: "none",
    bgcolor: "transparent",
  }}
>
  {/* Image */}
  <Box
    sx={{
      borderRadius: 3,
      overflow: "hidden",
    }}
  >
    <CardMedia
      component="img"
      image={blogImages[index]}
      alt={post.title}
      sx={{
        height: { xs: 220, sm: 240, md: 260 },
        objectFit: "cover",
        width: "100%",
      }}
    />
  </Box>

  {/* Overlay Content Box */}
  <CardContent
    sx={{
      position: "absolute",
      bottom: -40,
      left: "50%",
      transform: "translateX(-50%)",
      width: "85%",
      bgcolor: "#f5f7fa",
      borderRadius: 3,
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      textAlign: "center",
      p: 3,
    }}
  >
    <Typography
      sx={{
        color: "#1a2b3c",
        fontSize: "1.05rem",
        fontWeight: 600,
        mb: 2,
        lineHeight: 1.4,
      }}
    >
      {post.title}
    </Typography>

    <Link
      href="#"
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        color: "#4CAF50",
        fontWeight: 500,
        "&:hover .arrow-icon": {
          transform: "translateX(4px)",
        },
      }}
    >
      Readmore
      <ArrowForwardIcon
        className="arrow-icon"
        sx={{
          fontSize: 18,
          transition: "transform 0.3s",
        }}
      />
    </Link>
  </CardContent>
</Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default EighthSection;