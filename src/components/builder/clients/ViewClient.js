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

export default function ViewClient() {
  const [client, setClient] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchClient = async () => {
    createAPIEndpoint(ENDPOINTS.clients)
      .fetchById(id)
      .then((res) => {
        setClient(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {client.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Username: {client.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Email: {client.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Phone Number: {client.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address: {client.address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Created At: {client.createdAt}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Updated At: {client.updatedAt}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate(`/builder/clients/edit/${id}`)}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}
