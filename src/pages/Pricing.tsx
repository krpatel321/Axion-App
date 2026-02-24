import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  CheckCircle,
  Cancel,
  Star,
  Security,
  RocketLaunch,
} from "@mui/icons-material";

import AccountBalanceWalletRounded from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import BusinessCenterRounded from "@mui/icons-material/BusinessCenterRounded";

import pricingData from "../data/pricingData.json";

function Pricing() {
  const data = pricingData;

  const [billingCycle, setBillingCycle] = React.useState<
    "monthly" | "annual"
  >("monthly");

  const themeColor = "#65ad45";

  // Plan icons instead of images
  const planIcons = [
    <AccountBalanceWalletRounded sx={{ fontSize: 40 }} />,
    <TrendingUpRounded sx={{ fontSize: 40 }} />,
    <BusinessCenterRounded sx={{ fontSize: 40 }} />,
  ];

  return (
    <Box
      sx={{
        py: 12,
        bgcolor: "#f5f7fa",
        minHeight: "100vh",
        "& *:focus": { outline: "none" },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            {data.heading}
          </Typography>
          <Typography color="text.secondary">
            {data.subheading}
          </Typography>
        </Box>

        {/* Billing Toggle */}
        <Box display="flex" justifyContent="center" mb={6}>
          <ToggleButtonGroup
            value={billingCycle}
            exclusive
            onChange={(_, value) => value && setBillingCycle(value)}
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="annual">Annual</ToggleButton>
          </ToggleButtonGroup>

          {billingCycle === "annual" && (
            <Chip
              label="Save 20%"
              sx={{
                ml: 2,
                bgcolor: themeColor,
                color: "white",
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4}>
          {data.plans.map((plan, index) => (
            <Grid size={{xs:12 , md:4}} key={plan.name}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: plan.popular
                    ? `0 8px 24px ${themeColor}30`
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                {plan.popular && (
                  <Box textAlign="center" mt={2}>
                    <Chip
                      icon={<Star sx={{ color: "white", fontSize: 18 }} />}
                      label="Most Popular"
                      sx={{
                        bgcolor: themeColor,
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                )}

                <CardContent>
                  <Box textAlign="center" mb={2}>
                    {/* 🔥 Icon Circle */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: `${themeColor}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        color: themeColor,
                      }}
                    >
                      {planIcons[index]}
                    </Box>

                    <Typography variant="h5" fontWeight={700}>
                      {plan.name}
                    </Typography>

                    <Typography color="text.secondary">
                      {plan.description}
                    </Typography>
                  </Box>

                  <Box textAlign="center" mb={3}>
                    <Typography variant="h4" fontWeight={700}>
                      $
                      {billingCycle === "monthly"
                        ? plan.price.monthly
                        : plan.price.annual}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </Typography>
                    </Typography>
                  </Box>

                  <List>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {feature.available ? (
                            <CheckCircle
                              sx={{ color: themeColor, fontSize: 20 }}
                            />
                          ) : (
                            <Cancel
                              sx={{ color: "#dc3545", fontSize: 20 }}
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={feature.name}
                          secondary={feature.limit}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ p: 3 }}>
                  <Button
                    fullWidth
                    variant={plan.popular ? "contained" : "outlined"}
                    sx={{
                      ...(plan.popular
                        ? {
                            bgcolor: themeColor,
                            color: "white",
                            "&:hover": { bgcolor: "#559539" },
                          }
                        : {
                            borderColor: themeColor,
                            color: themeColor,
                            "&:hover": {
                              bgcolor: `${themeColor}10`,
                            },
                          }),
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enterprise CTA */}
        <Box
          mt={10}
          p={6}
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            textAlign: "center",
            color: "black",
          }}
        >
          <RocketLaunch sx={{ fontSize: 40, mb: 2, color: themeColor }} />
          <Typography variant="h5" fontWeight={700} mb={2}>
            {data.enterprise.title}
          </Typography>
          <Typography mb={3} sx={{ opacity: 0.9 }}>
            {data.enterprise.description}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: themeColor,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#559539" },
            }}
          >
            {data.enterprise.cta}
          </Button>
        </Box>

        {/* Guarantee */}
        <Box
          mt={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Security sx={{ color: themeColor, fontSize: 28 }} />
          <Typography color="text.secondary">
            {data.guarantee}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Pricing;