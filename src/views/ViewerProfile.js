import React from "react";
import useStateContext from "../hooks/useStateContext";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import ProfilePicture from "../assets/profile-picture.png";

export default function ViewerProfile() {
  const { context } = useStateContext();
  // console.log(context);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <img
                src={ProfilePicture}
                alt="Profile"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "1%",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {context.name}
              </Typography>
              <br />
              <Typography variant="h6" color="text.secondary">
                Username: {context.username}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Email: {context.email}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Phone number: {context.phoneNumber}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Address: {context.address}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
