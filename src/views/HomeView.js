import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import AppsIcon from "@mui/icons-material/Apps";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://myboardwalk.ca/">
        Boardwalk Insurance
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const abpTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#FF7753",
      dark: "#e56b4a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default function HomeView() {
  const navigate = useNavigate();
  const handleUserLogin = () => {
    navigate("/login");
  };

  const handlClientLogin = () => {
    navigate("/viewer/login");
  };

  return (
    <ThemeProvider theme={abpTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AppsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Application Building Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Application Building Platform
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Applied Research Fall 2022 Project for Boardwalk Insurance.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleUserLogin}>
                Login as a user
              </Button>
              <Button variant="outlined" onClick={handlClientLogin}>
                Login as a client
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
