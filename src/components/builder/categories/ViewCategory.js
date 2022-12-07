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

export default function ViewCategory() {
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
            <Typography variant="h6" gutterBottom>
              Created At: {category.createdAt}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Updated At: {category.updatedAt}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate(`/builder/categories/edit/${id}`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
