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

export default function ViewQuestion() {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchQuestion = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.questions)
      .fetchById(id)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestion();
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
                {question.body}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Type: {question.questionType}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {question.questionType !== "Text" && (
                <Typography variant="h6" gutterBottom>
                  Choices:
                </Typography>
              )}
              {question.choices?.map((choice, index) => (
                <Grid item xs={12} key={index}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ marginLeft: "0.5rem" }}
                  >
                    - {choice.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate(`/builder/questions/edit/${id}`)}
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
