import React from 'react'
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

export default function ViewQuestion() {
  const [question, setQuestion] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchQuestion = async () => {
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

  return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {question.body}
              </Typography>
            </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Type: {question.type}
                </Typography>
              </Grid>
              <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Created At: {question.createdAt}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Updated At: {question.updatedAt}
            </Typography>
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
        </CardContent>
      </Card>
  )
}
