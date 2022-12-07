import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
} from "@mui/material";

export default function ViewApplication() {
  const [application, setApplication] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchApplication = async () => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {application.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {application.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Created At: {application.createdAt}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Updated At: {application.updatedAt}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate(`/builder/applications/edit/${id}`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}