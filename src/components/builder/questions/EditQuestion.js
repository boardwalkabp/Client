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

export default function EditQuestion() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.questions)
      .put(id, question)
      .then((res) => {
        navigate("/builder/questions");
      })
      .catch((err) => console.log(err));
  };

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
              <TextField
                name="body"
                label="Question"
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="type"
                label="Type"
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}