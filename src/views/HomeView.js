import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserLogin from "../components/auth/UserLogin";
import ClientLogin from "../components/auth/ClientLogin";

export default function HomeView() {
  return (
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
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Applied Research Fall 2022 Project for Boardwalk Insurance.
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <UserLogin />
        <ClientLogin />
      </Stack>
    </Container>
  );
}
