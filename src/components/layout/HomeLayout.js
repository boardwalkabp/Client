import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
// import BoardwalkLogo from "../../assets/boardwalk-white.png";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";

export default function HomeLayout() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleAboutClick = () => {
    navigate("/about");
  };
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            {/* <Grid item sx={{ mt: 1 }}>
              <img
                src={BoardwalkLogo}
                alt="Boardwalk Logo"
                onClick={handleHomeClick}
                style={{
                  height: "50px",
                  cursor: "pointer",
                }}
              />
            </Grid> */}

            <Grid item>
              <IconButton
                size="large"
                aria-label="Home"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleHomeClick}
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Application Building Platform
              </Typography>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2}>
            <IconButton
              size="large"
              aria-label="About"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAboutClick}
              color="inherit"
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="Contact Us"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleContactClick}
              color="inherit"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Outlet />
        <Footer />
      </Box>
    </div>
  );
}
