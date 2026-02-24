// import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
//   CardContent,
  Avatar,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  Search,
  Group,
//   Event,
//   Forum,
  TrendingUp,
  ArrowForward,
  Favorite,
  Chat,
  Share,
} from "@mui/icons-material";

import communityData from "../data/communityData.json";

import communityBanner from "../assets/Illustration.png";
import member1 from "../assets/Icon.png";
import member2 from "../assets/Icon(1).png";
import member3 from "../assets/Icon(2).png";
import post1 from "../assets/Icon(3).png";
import post2 from "../assets/Logo(1).png";
import post3 from "../assets/Logo(2).png";

/* ================= TYPES ================= */

interface Stat {
  value: string;
  label: string;
}

interface Member {
  name: string;
  role: string;
}

interface Topic {
  name: string;
  posts: number;
}

interface Post {
  author: string;
  time: string;
  title: string;
  excerpt: string;
  image?: boolean;
  likes: number;
  comments: number;
  shares: number;
}

interface EventItem {
  date: string;
  month: string;
  title: string;
  time: string;
  attendees: number;
}

interface CommunityData {
  hero: { title: string; description: string };
  stats: Stat[];
  featuredMembers: Member[];
  trendingTopics: Topic[];
  posts: Post[];
  events: EventItem[];
  cta: { title: string; description: string };
}

const data: CommunityData = communityData;

/* ================= COMPONENT ================= */

function Community() {
  const memberAvatars = [member1, member2, member3];
  const postImages = [post1, post2, post3];

  return (
    <Box sx={{ pt: 16, pb: 12, bgcolor: "#f8fafc" }}>
      <Container maxWidth="xl">
        {/* ================= HERO ================= */}
        <Card sx={{ borderRadius: 5, mb: 8, overflow: "hidden" }}>
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src={communityBanner}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ p: 6 }}>
              <Typography variant="h4" fontWeight={700} mb={3}>
                {data.hero.title}
              </Typography>

              <Typography color="text.secondary" mb={4}>
                {data.hero.description}
              </Typography>

              <Box display="flex" gap={2}>
                <Button variant="contained" sx={{background:"#4CAF50"}}>
                  Join Community
                </Button>
                <Button variant="outlined" color="success">
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* ================= STATS ================= */}
        <Grid container spacing={3} mb={8}>
          {data.stats.map((stat, index) => (
            <Grid key={index} size={{ xs: 6, md: 3 }}>
              <Card sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
                <Typography variant="h4" color="success.main" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ================= SEARCH ================= */}
        <Box mb={6}>
          <TextField
            fullWidth
            placeholder="Search discussions..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={5}>
          {/* ===== LEFT ===== */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ p: 4, mb: 4 }}>
              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <Group color="success" />
                <Typography fontWeight={600}>
                  Featured Members
                </Typography>
              </Box>

              {data.featuredMembers.map((member, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <Avatar src={memberAvatars[index]} />
                  <Box ml={2}>
                    <Typography fontWeight={600}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Card>

            <Card sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <TrendingUp color="success" />
                <Typography fontWeight={600}>
                  Trending Topics
                </Typography>
              </Box>

              {data.trendingTopics.map((topic, index) => (
                <Box key={index} display="flex" justifyContent="space-between" mb={2}>
                  <Typography>{topic.name}</Typography>
                  <Chip label={`${topic.posts} posts`} size="small" />
                </Box>
              ))}
            </Card>
          </Grid>

          {/* ===== CENTER ===== */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography fontWeight={600}>Recent Discussions</Typography>
              <Button endIcon={<ArrowForward />} color="success">
                View All
              </Button>
            </Box>

            {data.posts.map((post, index) => (
              <Card key={index} sx={{ p: 4, mb: 4, borderRadius: 4 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={memberAvatars[index]} />
                  <Box ml={2}>
                    <Typography fontWeight={600}>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.time}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" fontWeight={600} mb={1}>
                  {post.title}
                </Typography>

                <Typography color="text.secondary" mb={2}>
                  {post.excerpt}
                </Typography>

                {post.image && (
                  <Box
                    component="img"
                    src={postImages[index]}
                    sx={{ width: "100%", borderRadius: 3, mb: 2 }}
                  />
                )}

                <Box display="flex" gap={4}>
                  <Typography display="flex" alignItems="center" gap={1}>
                    <Favorite color="error" /> {post.likes}
                  </Typography>
                  <Typography display="flex" alignItems="center" gap={1}>
                    <Chat color="success" /> {post.comments}
                  </Typography>
                  <Typography display="flex" alignItems="center" gap={1}>
                    <Share /> {post.shares}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Grid>

          {/* ===== RIGHT ===== */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontWeight={600} mb={3}>
              Upcoming Events
            </Typography>

            {data.events.map((event, index) => (
              <Card key={index} sx={{ p: 3, mb: 3 }}>
                <Typography fontWeight={600}>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date} {event.month} • {event.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.attendees} attending
                </Typography>
                <Button fullWidth variant="outlined" color="success" sx={{ mt: 2 }}>
                  RSVP
                </Button>
              </Card>
            ))}
          </Grid>
        </Grid>

        {/* ================= CTA ================= */}
        <Card sx={{ p: 8, mt: 10, textAlign: "center", borderRadius: 5 }}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            {data.cta.title}
          </Typography>
          <Typography color="text.secondary" mb={4}>
            {data.cta.description}
          </Typography>
          <Button variant="contained" color="success">
            Join Now
          </Button>
        </Card>
      </Container>
    </Box>
  );
}

export default Community;