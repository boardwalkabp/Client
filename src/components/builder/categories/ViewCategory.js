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
  CircularProgress,
  Box,
} from "@mui/material";

export default function ViewCategory() {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCategory = async () => {
    setLoading(true);
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

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <Card
      sx={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity 1s",
      }}
    >
      <CardContent>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {category.name}
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
        )}
      </CardContent>
    </Card>
  );
}
