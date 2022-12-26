import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function ViewAnsweredApplication() {
  const [application, setApplication] = useState({});
  const [client, setClient] = useState({});
  const [category, setCategory] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  const [values, setValues] = useState({
    answers: [],
    completedAt: "",
  });
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchApplication = async () => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        // console.log(res.data);
        if (res.data.status !== "") {
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

  const handleChange = (e) => {
    const questionId = e.target.name;
    const value = e.target.value;

    const answerIndex = values.answers.findIndex(
      (answer) => answer.questionId === questionId
    );
    if (answerIndex !== -1) {
      if (e.target.type === "checkbox") {
        const newAnswers = [...values.answers];
        newAnswers[answerIndex] = {
          questionId,
          value: [...newAnswers[answerIndex].value, value],
        };
        setValues({ ...values, answers: newAnswers });
      } else {
        const newAnswers = [...values.answers];
        newAnswers[answerIndex] = { questionId, value };
        setValues({ ...values, answers: newAnswers });
      }
    } else {
      if (e.target.type === "checkbox") {
        setValues({
          ...values,
          answers: [...values.answers, { questionId, value: [value] }],
        });
      } else {
        setValues({
          ...values,
          answers: [...values.answers, { questionId, value }],
        });
      }
    }
  };
  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleClose = () => {
    navigate("/builder/home");
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        setQuestions(res.data.questions);
        setAnswers(res.data.answers);
      })
      .catch((err) => console.log(err));
  }, [id]);
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
    <div>
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
              <Typography variant="body1" gutterBottom>
                Questions and Answers:
              </Typography>
            </Grid>
            <br />
            <Grid container spacing={2}></Grid>
            <Grid item xs={12}>
              {questions[currentQuestionIndex] && (
                <div>
                  <Typography variant="h6" gutterBottom>
                    {questions[currentQuestionIndex].body}
                  </Typography>
                  {questions[currentQuestionIndex].questionType === "Radio" && (
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        {questions[currentQuestionIndex].question}
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name={questions[currentQuestionIndex].id}
                        onChange={handleChange}
                      >
                        {questions[currentQuestionIndex].choices.map(
                          (option, index) => {
                            let checked;
                            if (showAlert) {
                              checked =
                                application.answers.find(
                                  (answer) =>
                                    answer.questionId ===
                                    questions[currentQuestionIndex].id
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
                          }
                        )}
                      </RadioGroup>
                    </FormControl>
                  )}

                  {questions[currentQuestionIndex].questionType ===
                    "CheckBox" && (
                    <FormGroup>
                      {questions[currentQuestionIndex].choices.map(
                        (option, index) => {
                          let checked;
                          if (showAlert) {
                            checked = application.answers
                              .find(
                                (answer) =>
                                  answer.questionId ===
                                  questions[currentQuestionIndex].id
                              )
                              ?.value.includes(option.value);
                          }
                          return (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  name={questions[currentQuestionIndex].id}
                                  value={option.value}
                                  onChange={handleChange}
                                  key={option.id}
                                  disabled={showAlert}
                                  checked={checked}
                                />
                              }
                              label={option.value}
                            />
                          );
                        }
                      )}
                    </FormGroup>
                  )}
                  {questions[currentQuestionIndex].questionType === "Text" && (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      name={questions[currentQuestionIndex].id}
                      placeholder={questions[currentQuestionIndex].placeholder}
                      onChange={handleChange}
                      disabled={showAlert}
                      {...(showAlert
                        ? {
                            value: application.answers.find(
                              (answer) =>
                                answer.questionId ===
                                questions[currentQuestionIndex].id
                            )?.value,
                          }
                        : {})}
                    />
                  )}
                </div>
              )}
            </Grid>

            <Grid item xs={12}>
              {currentQuestionIndex > 0 && (
                <Grid item xs={12}>
                  <Button
                    style={{ float: "left" }}
                    variant="outlined"
                    color="primary"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </Grid>
              )}
              {currentQuestionIndex < questions.length - 1 && (
                <Grid item xs={12}>
                  <Button
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Grid>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <Grid item xs={12}>
                  <Button
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
