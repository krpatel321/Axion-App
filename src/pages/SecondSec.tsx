import { Box, Container, Typography } from "@mui/material";
import microsoftIcon from "../assets/Logo.png";
import googleIcon from "../assets/Logo(1).png";
import amazonIcon from "../assets/Logo(2).png";
import appleIcon from "../assets/Logo(3).png";
import metaIcon from "../assets/Logo(4).png";
import mbetaIcon from "../assets/Logo(5).png";
import getaIcon from "../assets/Logo(6).png";
import clientsData from "../data/secondData.json";

/* ---------------- ICON MAP ---------------- */

const iconMap = {
  "Logo.png": microsoftIcon,
  "Logo(1).png": googleIcon,
  "Logo(2).png": amazonIcon,
  "Logo(3).png": appleIcon,
  "Logo(4).png": metaIcon,
  "Logo(5).png": mbetaIcon,
  "Logo(6).png": getaIcon,
} as const;

/* ---------------- TYPES ---------------- */

type IconKey = keyof typeof iconMap;

interface Client {
  id?: number;
  name: string;
  icon: IconKey;
}

interface ClientsData {
  heading: string;
  subheading: string;
  clients: Client[];
}

const data = clientsData as ClientsData;

/* ---------------- COMPONENT ---------------- */

function ClientsSection() {
  // duplicate for infinite loop
  const duplicatedClients = [...data.clients, ...data.clients];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "white",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
          }}
        >
          {data.heading}
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "text.secondary",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "0.95rem", md: "1rem" },
          }}
        >
          {data.subheading}
        </Typography>
      </Container>

      {/* Moving Logos */}
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: "scroll 25s linear infinite",
          "@keyframes scroll": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        }}
      >
        {duplicatedClients.map((client, index) => (
          <Box
            key={`client-${client.id ?? index}`}
            sx={{
              flex: "0 0 auto",
              mx: { xs: 3, sm: 4, md: 6 },
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 50, sm: 60, md: 70 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.8,
              transition: "0.3s",
              "&:hover": {
                opacity: 1,
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src={iconMap[client.icon]}
              alt={client.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ClientsSection;