import React from "react";
import useStateContext from "../../hooks/useStateContext";
import { Paper, Box, Grid, Typography } from "@mui/material";
import Applications from "../viewer/Applications";

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
          {/* Applications */}
          <Grid item xs={12} md={8} lg={12}>
              <Applications />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
