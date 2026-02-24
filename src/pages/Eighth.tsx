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
            gap: 4,
          }}
        >
          {data.posts.map((post, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                // transition: "transform 0.3s, box-shadow 0.3s",
                // "&:hover": {
                //   transform: "translateY(-4px)",
                //   boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                // },
              }}
            >
              {/* Blog Image */}
              <CardMedia
                component="img"
                height="200"
                image={blogImages[index]}
                alt={post.title}
                sx={{
                  objectFit: "cover",
                }}
              />
              
              {/* Blog Content */}
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    color: "#1a2b3c",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    mb: 2,
                    lineHeight: 1.4,
                    height: "3.5rem",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
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
                    fontSize: "1rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    "&:hover": {
                      color: "#45a049",
                      "& .arrow-icon": {
                        transform: "translateX(4px)",
                      },
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