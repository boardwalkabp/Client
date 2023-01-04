import React from "react";
import { Grid, Typography, Link, Box, Card, Container } from "@mui/material";
import useStyles from "../hooks/useStyles";

export default function AboutView() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100%",
          py: 3,
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" className={classes.formHeading}>
              About the application
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              This application is a prototype for a project for Boardwalk
              Insurance. It is a web application that allows users to create and
              manage their applications. The application is built using React
              18, ASP.NET Core 6, and PostgreSQL. The backend is hosted on
              Heroku, the database is hosted on AWS, the frontend is hosted on
              Netlify, and the source code is available on{" "}
              <Link href="https://github.com/orgs/boardwalkabp/repositories">
                GitHub
              </Link>
              .
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box sx={{ pr: 2, pl: 2 }}>
              <Typography
                variant="h4"
                className={classes.formHeading}
                gutterBottom
              >
                How to use the application
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      align="center"
                      color="text.secondary"
                      paragraph
                    >
                      How to use the app as a user:
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      1. Create an account or login as a user.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      2. Create a client.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      3. Create an application.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      4. Add questions to your application.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      5. Save your application and share the link with a client.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      6. Once the client has submitted their application, you
                      can view it in the "Answered Applications" table.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      align="center"
                      color="text.secondary"
                      paragraph
                    >
                      How to use the app as a client:
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      1. Login as a client.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      2. Your client dashboard will show you the applications
                      that you have been invited to answer.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      3. Click on the pencil icon to start answering the
                      questions.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      3. Answer the questions.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      4. Submit the application.
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      5. You can view the submitted application by clicking on
                      the eye icon.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
