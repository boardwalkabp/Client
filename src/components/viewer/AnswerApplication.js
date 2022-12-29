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
  RadioGroup
} from "@mui/material";
import $, { contains } from "jquery";

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
        if (res.data.status == "Completed") {
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

    const answerIndex = values.answers.findIndex((answer) => answer.questionId === questionId);
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
        setValues({ ...values, answers: [...values.answers, { questionId, value }] });
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
  useEffect(() => {
    fetchApplication();
  }, []);
  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handleBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };


  return (
    <Card>
      <CardContent>
        {showAlert && (
          <Alert severity="error">
            You have already answered this application
          </Alert>
        )}
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
                      {questions[currentQuestionIndex].choices.map((option, index) => {
                        let checked;
                        if (showAlert) {
                          checked = application.answers.find(
                            (answer) => answer.questionId === questions[currentQuestionIndex].id
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


                {questions[currentQuestionIndex].questionType === "CheckBox" && (
                  <FormGroup>
                    {questions[currentQuestionIndex].choices.map((option, index) => {
                      let checked;
                      if (showAlert) {
                        checked = application.answers.find(
                          (answer) => answer.questionId === questions[currentQuestionIndex].id
                        )?.value.includes(option.value);
                      }
                      return (
                        < FormControlLabel
                          key={index}
                          control={
                            < Checkbox
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
                    })}
                  </FormGroup>
                )}
                {questions[currentQuestionIndex].questionType === "Text" && (
                  <input
                    type="text"
                    name={questions[currentQuestionIndex].id}
                    placeholder={questions[currentQuestionIndex].placeholder}
                    onChange={handleChange}
                    disabled={showAlert}
                    {...(showAlert
                      ? {
                        value: application.answers.find(
                          (answer) => answer.questionId === questions[currentQuestionIndex].id
                        )?.value
                      }
                      : {})}
                  />
                )}
              </div>
            )}
          </Grid>

          {currentQuestionIndex > 0 && (
            <Grid item xs={11}>
              <Button variant="contained" color="secondary" onClick={handleBack}>
                Back
              </Button>
            </Grid>
          )}
          {currentQuestionIndex < questions.length - 1 && (
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Grid>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            !showAlert && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit
                </Button>
              </Grid>
            )
          )}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {success && showAlert && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}


