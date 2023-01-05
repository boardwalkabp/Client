import React from "react";
import { Stack, Typography, Container } from "@mui/material";
import UserLogin from "../components/auth/UserLogin";
import ClientLogin from "../components/auth/ClientLogin";
// import Section from "../components/layout/Section";
import AboutView from "./AboutView";
import ContactView from "./ContactView";

export default function HomeView() {
  return (
    <Container maxWidth="lg">
      <Typography
        fontWeight={500}
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

      <Stack sx={{ p: 4 }} direction="row" spacing={2} justifyContent="center">
        <UserLogin />
        <ClientLogin />
      </Stack>

      <AboutView />
      <ContactView />
    </Container>
  );
}
