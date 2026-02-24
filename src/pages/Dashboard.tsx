// import  { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Divider,
//   Grid
// } from "@mui/material";
// // import Grid from "@mui/material/Grid2";
// import {
//   Email,
//   Phone,
//   Logout,
//   Dashboard as DashboardIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
//   phone?: string;
// }

// function Dashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const currentUser = localStorage.getItem("currentUser");
//     if (currentUser) {
//       setUser(JSON.parse(currentUser) as User);
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//   };

//   if (!user) return null;

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", py: 4 }}>
//       <Container maxWidth="lg">
//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             bgcolor: "#ffffff",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <DashboardIcon sx={{ color: "#4CAF50", fontSize: 32 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600 }}>
//               Dashboard
//             </Typography>
//           </Box>

//           <Button
//             variant="outlined"
//             startIcon={<Logout />}
//             onClick={handleLogout}
//             sx={{
//               color: "#dc3545",
//               borderColor: "#dc3545",
//               "&:hover": {
//                 borderColor: "#c82333",
//                 backgroundColor: "rgba(220, 53, 69, 0.04)",
//               },
//             }}
//           >
//             Logout
//           </Button>
//         </Paper>

//         <Grid container spacing={4}>
//           {/* Profile */}
//           <Grid xs={12} md={4}>
//             <Card sx={{ borderRadius: 2 }}>
//               <CardContent sx={{ textAlign: "center", p: 4 }}>
//                 <Avatar
//                   src={user.avatar}
//                   sx={{
//                     width: 120,
//                     height: 120,
//                     mx: "auto",
//                     mb: 2,
//                     border: "4px solid #4CAF50",
//                   }}
//                 />
//                 <Typography variant="h5" sx={{ fontWeight: 600 }}>
//                   {user.name}
//                 </Typography>

//                 <Divider sx={{ my: 2 }} />

//                 <Box sx={{ textAlign: "left" }}>
//                   <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//                     <Email sx={{ color: "#4CAF50" }} />
//                     <Typography>{user.email}</Typography>
//                   </Box>

//                   {user.phone && (
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <Phone sx={{ color: "#4CAF50" }} />
//                       <Typography>{user.phone}</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Stats */}
//           <Grid xs={12} md={8}>
//             <Grid container spacing={3}>
//               <Grid xs={12} sm={6}>
//                 <Card>
//                   <CardContent>
//                     <Typography>Total Projects</Typography>
//                     <Typography variant="h3" sx={{ color: "#4CAF50" }}>
//                       12
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               <Grid xs={12} sm={6}>
//                 <Card>
//                   <CardContent>
//                     <Typography>Tasks Completed</Typography>
//                     <Typography variant="h3" sx={{ color: "#4CAF50" }}>
//                       48
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               <Grid xs={12}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ mb: 2 }}>
//                       Recent Activity
//                     </Typography>
//                     <Typography>Logged in successfully</Typography>
//                     <Typography>Updated profile information</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default Dashboard;