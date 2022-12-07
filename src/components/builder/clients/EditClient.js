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
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export default function EditClient() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.clients)
      .put(id, client)
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                name="name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                name="address"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}
