import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";

export default function AnswerApplication() {
  const [application, setApplication] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const fetchApplication = async () => {
    setLoading(true);
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

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handleBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleClose = () => {
    navigate("/viewer/applications");
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    fetchApplication();
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
          <Box>
            {showAlert && (
              <Alert
                onClose={handleAlertClose}
                severity={
                  application.status === "Completed" ? "success" : "error"
                }
              >
                {application.status === "Completed"
                  ? "Application already submitted."
                  : "Application not submitted."}
              </Alert>
            )}

            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  {application.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {questions[currentQuestionIndex] && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                      {questions[currentQuestionIndex].body}
                    </Typography>
                    {questions[currentQuestionIndex].questionType ===
                      "Radio" && (
                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                          {questions[currentQuestionIndex].question}
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name={questions[currentQuestionIndex].id}
                        >
                          {questions[currentQuestionIndex].choices.map(
                            (option, index) => {
                              let checked;
                              checked =
                                application.answers.find(
                                  (answer) =>
                                    answer.questionId ===
                                    questions[currentQuestionIndex].id
                                )?.value === option.value;
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
                            checked = application.answers
                              .find(
                                (answer) =>
                                  answer.questionId ===
                                  questions[currentQuestionIndex].id
                              )
                              ?.value.includes(option.value);
                            return (
                              <FormControlLabel
                                key={index}
                                control={
                                  <Checkbox
                                    name={questions[currentQuestionIndex].id}
                                    value={option.value}
                                    key={option.id}
                                    disabled
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
                    {questions[currentQuestionIndex].questionType ===
                      "Text" && (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={questions[currentQuestionIndex].id}
                        disabled
                        {...(application.answers
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
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
