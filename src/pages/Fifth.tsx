import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";

import membersIcon from "../assets/S.png";
import clubsIcon from "../assets/S(1).png";
import eventsIcon from "../assets/S(2).png";
import paymentsIcon from "../assets/S(3).png";

interface Stat {
  value: string;
  label: string;
}

interface FifthData {
  subheading: string;
  stats: Stat[];
}

function FifthSection() {
  const [data, setData] = useState<FifthData | null>(null);

  useEffect(() => {
    import("../data/fifthData.json")
      .then((module: { default: FifthData }) => {
        setData(module.default);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) return null;

  const icons = [membersIcon, clubsIcon, eventsIcon, paymentsIcon];

  return (
  <Box
    sx={{
      py: { xs: 6, md: 10 },
      bgcolor: "#f5f7fa",
      width: "100%",
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 6, md: 4 },
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.6rem",
                lg: "3rem",
              },
              lineHeight: 1.2,
              color: "#1a2b3c",
              mb: 2,
            }}
          >
            Helping a local
            <br />
            business{" "}
            <Box component="span" sx={{ color: "#4CAF50" }}>
              reinvent itself
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#6c757d",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              maxWidth: { md: 420 },
              mx: { xs: "auto", md: 0 },
              lineHeight: 1.7,
            }}
          >
            {data.subheading}
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {data.stats.map((stat, index) => (
              <Grid  key={index} size={{xs:12, sm:6}}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Box
                    component="img"
                    src={icons[index]}
                    alt={stat.label}
                    sx={{
                      width: { xs: 40, sm: 45, md: 48 },
                      height: { xs: 40, sm: 45, md: 48 },
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: {
                          xs: "1.5rem",
                          md: "1.8rem",
                        },
                        color: "#1a2b3c",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        fontSize: { xs: "0.85rem", md: "1rem" },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  </Box>
);
  
}

export default FifthSection;