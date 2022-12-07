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

export default function EditCategory() {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCategory = async () => {
    createAPIEndpoint(ENDPOINTS.categories)
      .fetchById(id)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.categories)
      .put(id, category)
      .then((res) => {
        navigate("/builder/categories");
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {category.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
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
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}