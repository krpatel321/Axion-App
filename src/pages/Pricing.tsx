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

import pricingData from "../data/pricingData.json";

import basicPlan from "../assets/Logo(3).png";
import proPlan from "../assets/Logo(1).png";
import enterprisePlan from "../assets/Logo(2).png";

function Pricing() {
  const data = pricingData;

  const [billingCycle, setBillingCycle] = React.useState<
    "monthly" | "annual"
  >("monthly");

  const planImages = [basicPlan, proPlan, enterprisePlan];

  const themeColor = "#65ad45";

  return (
    <Box
      sx={{
        py: 12,
        bgcolor: "#f5f7fa",
        minHeight: "100vh",

        // 🔥 Remove yellow focus outline globally inside this page
        "& *:focus": {
          outline: "none",
        },
      }}
    >
      <Container maxWidth="lg">
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
            sx={{
              border: "none",
              "& .MuiToggleButton-root": {
                border: "none",
                color: "#6c757d",
                fontWeight: 600,
                outline: "none",
                "&.Mui-selected": {
                  bgcolor: themeColor,
                  color: "white",
                  "&:hover": {
                    bgcolor: "#559539",
                  },
                },
                "&:hover": {
                  bgcolor: "#f5f7fa",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&.Mui-focusVisible": {
                  outline: "none",
                  boxShadow: "none",
                },
              },
            }}
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
            <Grid size={{xs:12, md:4}} key={plan.name}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: plan.popular
                    ? `0 8px 24px ${themeColor}30`
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  outline: "none",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: plan.popular
                      ? `0 16px 32px ${themeColor}40`
                      : "0 12px 28px rgba(0,0,0,0.15)",
                  },

                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
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
                    <Box
                      component="img"
                      src={planImages[index]}
                      alt={plan.name}
                      sx={{ width: 70, mb: 2 }}
                    />
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
                              borderColor: "#559539",
                              bgcolor: `${themeColor}10`,
                            },
                          }),
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "1rem",
                      outline: "none",

                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
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
            bgcolor: "#1a2b3c",
            borderRadius: 4,
            textAlign: "center",
            color: "white",
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
              color: "white",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#559539",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
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