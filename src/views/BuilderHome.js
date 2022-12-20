import React from "react";
import useStateContext from "../hooks/useStateContext";
import { Paper, Box, Grid, Typography } from "@mui/material";
import AnsweredApplications from "../components/builder/applications/AnsweredApplications";

export default function Home() {
  const { context } = useStateContext();
  // console.log(context);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          {/* Welcome home */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div">
                Welcome home, {context.name}!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <AnsweredApplications />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
