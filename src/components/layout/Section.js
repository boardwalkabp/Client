import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import StorageIcon from "@mui/icons-material/Storage";
import ShareIcon from "@mui/icons-material/Share";
import useStyles from "../../hooks/useStyles";

export default function Section() {
  const classes = useStyles();

  const sectionItems = [
    {
      id: 1,
      icon: <UpdateIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        "The platform enhances the curent process of calling customers, drafting up lengthy emails and sending them over to underwriters at various insurance companies.",
    },
    {
      id: 2,
      icon: <StorageIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        "It enables users (brokers) to view, insert, edit, and delete applications, categories, clients, and questions in a database.",
    },
    {
      id: 3,
      icon: <ShareIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence: "Allows brokers to share the applications with clients.",
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: "400px" }}>
      <Grid container className={classes.sectionGridContainer}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={classes.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
