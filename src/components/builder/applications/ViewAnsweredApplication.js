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
  CircularProgress,
  Box,
} from "@mui/material";

export default function ViewAnsweredApplication() {
  const [values, setValues] = useState({
    answers: [],
    completedAt: "",
  });
  const [application, setApplication] = useState({});
  const [questions, setQuestions] = useState([]);
  const [client, setClient] = useState({});
  const [category, setCategory] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchApplication = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        // console.log(res.data);
        if (res.data.completedAt !== null) {
          setShowAlert(true);
        }
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
    setTimeout(() => {
      fetchApplication();
    }, 100);
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

  const handleClose = () => {
    navigate("/builder/home");
  };

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
                        // onChange={handleChange}
                      >
                        {question.choices.map((option, index) => {
                          let checked;
                          if (showAlert) {
                            checked =
                              application.answers.find(
                                (answer) => answer.questionId === question.id
                              )?.value === option.value;
                          }
                          return (
                            <FormControlLabel
                              key={index}
                              value={option.value}
                              control={<Radio />}
                              label={option.value}
                              disabled={showAlert}
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
                        if (showAlert) {
                          checked = application.answers
                            .find((answer) => answer.questionId === question.id)
                            ?.value.includes(option.value);
                        }
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                name={question.id}
                                value={option.value}
                                key={option.id}
                                disabled={showAlert}
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
                      disabled={showAlert}
                      {...(showAlert
                        ? {
                            value: application.answers.find(
                              (answer) => answer.questionId === question.id
                            )?.value,
                          }
                        : {})}
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
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
