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

export default function EditApplication() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication({
      ...application,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.applications)
      .put(id, application)
      .then((res) => {
        navigate("/builder/applications");
      })
      .catch((err) => console.log(err));
  };


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
            <TextField
              name="title"
              label="Title"
              onChange={handleInputChange}
              fullWidth
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
  );
}