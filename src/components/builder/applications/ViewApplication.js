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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  FormControl,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function ViewApplication() {
  const [application, setApplication] = useState({});
  const [questions, setQuestions] = useState([]);
  const [client, setClient] = useState({});
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchApplication = async () => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        // console.log(res.data);
        const questionIds = res.data.questions.map(
          (question) => question.value
        );
        createAPIEndpoint(ENDPOINTS.questions)
          .fetch()
          .then((res) => {
            const filteredQuestions = res.data.filter((question) =>
              questionIds.includes(question.id)
            );
            setQuestions(filteredQuestions);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchApplication();
  }, []);

  const clientId = application.clientId;
  const categoryId = application.categoryId;

  useEffect(() => {
    if (clientId) {
      createAPIEndpoint(ENDPOINTS.clients)
        .fetchById(clientId)
        .then((res) => {
          setClient(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [clientId]);

  useEffect(() => {
    if (categoryId) {
      createAPIEndpoint(ENDPOINTS.categories)
        .fetchById(categoryId)
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [categoryId]);

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
            <Typography variant="body1" gutterBottom>
              Client: {client.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Category: {category.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Status: {application.status}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {questions.map((question) => (
              <div className="added_question" key={question.id}>
                <Typography variant="h6" gutterBottom>
                  {question.body}
                </Typography>
                {question.questionType === "Radio" && (
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name={question.id}
                    >
                      {question.choices.map((option, index) => {
                        let checked;
                        return (
                          <FormControlLabel
                            key={index}
                            value={option.value}
                            control={<Radio />}
                            label={option.value}
                            disabled
                            checked={checked}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                )}
                {question.questionType === "CheckBox" && (
                  <FormGroup>
                    {question.choices.map((option, index) => {
                      let checked;
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              name={question.id}
                              value={option.value}
                              key={option.id}
                              disabled
                              checked={checked}
                            />
                          }
                          label={option.value}
                        />
                      );
                    })}
                  </FormGroup>
                )}
                {question.questionType === "Text" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    name={question.id}
                    placeholder={question.placeholder}
                    disabled
                  />
                )}
              </div>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate(`/builder/applications/edit/${id}`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
