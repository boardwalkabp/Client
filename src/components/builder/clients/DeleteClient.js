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
import { Box } from "@mui/system";

export default function DeleteClient() {
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

  const handleDelete = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.clients)
      .delete(id)
      .then((res) => {
        navigate("/builder/clients");
      })
      .catch((err) => console.log(err));
  };

  return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {client.name}
              </Typography>
              <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Are you sure you want to delete this client?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}