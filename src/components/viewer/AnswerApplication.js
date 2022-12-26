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
    // console.log(application);
    createAPIEndpoint(ENDPOINTS.applications)
      .put(id, application)
      .then((res) => {
        setSuccess("Application submitted successfully");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
        setLoading(false);
        setTimeout(() => {
          navigate("/viewer/applications");
        }, 1000);
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

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <Card>
      <CardContent>
        {showAlert && (
          <Alert
            severity={application.status === "Completed" ? "success" : "error"}
          >
            {application.status === "Completed"
              ? "Application submitted successfully"
              : "Application already submitted"}
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
                    placeholder="Enter your answer here"
                    name={questions[currentQuestionIndex].id}
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
                  disabled={
                    !showAlert &&
                    ((questions[currentQuestionIndex].questionType ===
                      "Radio" &&
                      !values.answers.find(
                        (answer) =>
                          answer.questionId ===
                          questions[currentQuestionIndex].id
                      )) ||
                      (questions[currentQuestionIndex].questionType ===
                        "CheckBox" &&
                        !values.answers.find(
                          (answer) =>
                            answer.questionId ===
                            questions[currentQuestionIndex].id
                        )) ||
                      (questions[currentQuestionIndex].questionType ===
                        "Text" &&
                        !values.answers.find(
                          (answer) =>
                            answer.questionId ===
                            questions[currentQuestionIndex].id
                        )))
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
                >
                  Submit
                </Button>
              </Grid>
            )}
            {currentQuestionIndex === questions.length - 1 && showAlert && (
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
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
