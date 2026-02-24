import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import instagramIcon from "../assets/insta.png";
import dribbbleIcon from "../assets/web.png";
import twitterIcon from "../assets/twitter.png";
import youtubeIcon from "../assets/utube.png";
import logoIcon from "../assets/Icon.png";

interface FooterData {
  logo: string;
  copyright: string;
  rights: string;
  company: string;
  aboutUs: string;
  blog: string;
  contactUs: string;
  pricing: string;
  testimonials: string;
  support: string;
  helpCenter: string;
  termsOfService: string;
  legal: string;
  privacyPolicy: string;
  status: string;
  stayUpToDate: string;
  emailPlaceholder: string;
}

function TenthSection() {
  const [data, setData] = useState<FooterData | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    import("../data/footer.json")
      .then((module) => setData(module.default))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  /* ✅ SOCIAL LINKS */
  const socialLinks = [
    { icon: instagramIcon, url: "https://www.instagram.com/" },
    { icon: dribbbleIcon, url: "https://dribbble.com/" },
    { icon: twitterIcon, url: "https://twitter.com/" },
    { icon: youtubeIcon, url: "https://www.youtube.com/" },
  ];

  /* ✅ EMAIL SUBMIT */
  const handleEmailSubmit = async () => {
  if (!email) return;

  try {
    await fetch("http://localhost:5000/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setEmail(""); // clear input
    alert("email sent!");
  } catch (error) {
    console.error("Error saving email:", error);
    alert("Server error. Make sure JSON server is running.");
  }
};

  return (
    <Box sx={{ py: 8, bgcolor: "#1a2b3c" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Column 1 */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <Box
                  component="img"
                  src={logoIcon}
                  alt="Logo"
                  sx={{ width: 35, height: 35 }}
                />
                <Typography variant="h5" fontWeight={700} color="#fff">
                  {data.logo}
                </Typography>
              </Box>

              <Typography color="#89939e" mb={3}>
                {data.copyright}
              </Typography>

              {/* ✅ CLICKABLE SOCIAL ICONS */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {socialLinks.map((item, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={item.icon}
                    alt="social"
                    onClick={() => window.open(item.url, "_blank")}
                    sx={{
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      transition: "transform 0.3s, opacity 0.3s",
                      opacity: 0.8,
                      "&:hover": {
                        transform: "scale(1.1)",
                        opacity: 1,
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Column 4 - Email */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography color="#fff" fontWeight={600} mb={3}>
              {data.stayUpToDate}
            </Typography>

            <TextField
              fullWidth
              placeholder={data.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEmailSubmit();
                }
              }}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#2d3f4e",
                  "& fieldset": { border: "none" },
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleEmailSubmit}
                      sx={{
                        color: "#89939e",
                        "&:hover": { color: "#4CAF50" },
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Bottom Line */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid #2d3f4e",
            textAlign: "center",
          }}
        >
          <Typography color="#89939e" fontSize="0.9rem">
            {data.copyright} {data.rights}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default TenthSection;