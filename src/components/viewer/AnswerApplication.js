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
  TextField,
  RadioGroup,
} from "@mui/material";

export default function AnswerApplication() {
  const [values, setValues] = useState({
    answers: [],
    completedAt: "",
  });
  const [application, setApplication] = useState({});
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const fetchApplication = async () => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        if (res.data.status === "Completed") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    application.answers = values.answers.map((answer) => {
      if (Array.isArray(answer.value)) {
        return { ...answer, value: answer.value.join(", ") };
      }
      return answer;
    });
    application.completedAt = new Date().toISOString();
    application.status = "Completed";
    createAPIEndpoint(ENDPOINTS.applications)
      .put(id, application)
      .then((res) => {
        setSuccess("Application submitted successfully!");
        setShowAlert(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchApplication();
  }, []);
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

  return (
    <Card>
      <CardContent>
        {success && showAlert && (
          <Grid item xs={12}>
            <Alert severity="success">{success}</Alert>
          </Grid>
        )}
        {error && showAlert && (
          <Grid item xs={12}>
            <Alert onClose={handleAlertClose} severity="error">
              {error}
            </Alert>
          </Grid>
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
                {questions[currentQuestionIndex].questionType === "Radio" && (
                  <FormControl>
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
                    fullWidth
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
                  disabled={showAlert}
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
                  // disable if question is not answered
                  disabled={
                    !values.answers.find(
                      (answer) =>
                        answer.questionId === questions[currentQuestionIndex].id
                    )
                  }
                >
                  Next
                </Button>
              </Grid>
            )}
            {currentQuestionIndex === questions.length - 1 && !showAlert && (
              <Grid item xs={12}>
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={values.answers.length !== questions.length}
                  hidden={showAlert}
                >
                  Submit
                </Button>
              </Grid>
            )}
            {showAlert && (
              <Grid item xs={12}>
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  hidden={!showAlert}
                >
                  Close
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
