import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Pagination,
  Breadcrumbs,
  Link,
  Paper,
} from "@mui/material";
import {
  Search,
//   CalendarToday,
//   AccessTime,
  Comment,
  Favorite,
  ArrowForward,
  TrendingUp,
  NewReleases,
  Category,
  Tag,
} from "@mui/icons-material";

import blogData from "../data/blogData.json";

// Images
import blogBanner from "../assets/Illustration.png";
import blogPost1 from "../assets/Illustration.png";
import blogPost2 from "../assets/Icon(1).png";
import blogPost3 from "../assets/Icon(2).png";
import blogPost4 from "../assets/Icon(3).png";
import blogPost5 from "../assets/Icon.png";
import blogPost6 from "../assets/image.png";
import author1 from "../assets/Logo(1).png";
import author2 from "../assets/Logo(2).png";
import author3 from "../assets/Logo(3).png";

/* ================= TYPES ================= */

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  likes: number;
  comments: number;
  date?: string;
}

interface BlogData {
  heading: string;
  subheading: string;
  featuredPost: {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    authorRole: string;
  };
  posts: BlogPost[];
  categories: { name: string; count: number }[];
  popularPosts: { title: string; date: string }[];
  tags: string[];
  newsletter: { title: string; description: string };
}

/* ================= COMPONENT ================= */

function Blog() {
  const data = blogData as BlogData;

  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const blogImages = [
    blogPost1,
    blogPost2,
    blogPost3,
    blogPost4,
    blogPost5,
    blogPost6,
  ];
  const authorAvatars = [author1, author2, author3];

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredPosts = data.posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postsPerPage = 3;
  const displayedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Box sx={{ py: 12, bgcolor: "#f5f7fa" }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="#4CAF50">Blog</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            {data.heading}
          </Typography>
          <Typography color="text.secondary" maxWidth={600} mx="auto">
            {data.subheading}
          </Typography>
        </Box>

        {/* Search */}
        <Box maxWidth={500} mx="auto" mb={6}>
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* MAIN CONTENT */}
          <Grid size={{xs:12,md:8}}>
            {/* Featured */}
            {page === 1 && !searchTerm && (
              <Card sx={{ mb: 5 }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={blogBanner}
                />
                <CardContent>
                  <Chip
                    icon={<NewReleases />}
                    label={data.featuredPost.category}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h5" fontWeight={700} mb={2}>
                    {data.featuredPost.title}
                  </Typography>
                  <Typography color="text.secondary" mb={3}>
                    {data.featuredPost.excerpt}
                  </Typography>
                  <Button endIcon={<ArrowForward />}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Posts */}
            {displayedPosts.map((post, index) => (
              <Card key={index} sx={{ mb: 3 }}>
                <Grid container>
                  <Grid size={{xs:12,md:4}}>
                    <CardMedia
                      component="img"
                      image={blogImages[index % blogImages.length]}
                      height="100%"
                    />
                  </Grid>
                  <Grid size={{xs:12,md:8}}>
                    <CardContent>
                      <Chip label={post.category} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h6" fontWeight={600}>
                        {post.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        fontSize="0.9rem"
                        mb={2}
                      >
                        {post.excerpt}
                      </Typography>

                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar
                            src={
                              authorAvatars[
                                index % authorAvatars.length
                              ]
                            }
                          />
                          <Typography fontSize="0.85rem">
                            {post.author}
                          </Typography>
                        </Box>

                        <Box display="flex" gap={2}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Favorite fontSize="small" />
                            <Typography fontSize="0.8rem">
                              {post.likes}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Comment fontSize="small" />
                            <Typography fontSize="0.8rem">
                              {post.comments}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(filteredPosts.length / postsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </Grid>

          {/* SIDEBAR */}
          <Grid size={{xs:12,md:4}}>
            {/* Categories */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" mb={2}>
                <Category sx={{ mr: 1 }} />
                Categories
              </Typography>
              {data.categories.map((cat, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography>{cat.name}</Typography>
                  <Chip label={cat.count} size="small" />
                </Box>
              ))}
            </Paper>

            {/* Popular Posts */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" mb={2}>
                <TrendingUp sx={{ mr: 1 }} />
                Popular Posts
              </Typography>
              {data.popularPosts.map((post, index) => (
                <Box key={index} mb={2}>
                  <Typography fontWeight={600}>
                    {post.title}
                  </Typography>
                  <Typography fontSize="0.8rem" color="text.secondary">
                    {post.date}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* Tags */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" mb={2}>
                <Tag sx={{ mr: 1 }} />
                Tags
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {data.tags.map((tag, index) => (
                  <Chip key={index} label={tag} />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Blog;