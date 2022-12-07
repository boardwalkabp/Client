import React from "react";
import useStateContext from "../../hooks/useStateContext";
import { Paper, Box, Grid, Typography } from "@mui/material";
import Chart from "./Chart";
import Deposits from "./Deposits";

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
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
