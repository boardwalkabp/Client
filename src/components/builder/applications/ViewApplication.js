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
import $ from "jquery";

export default function ViewApplication() {
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
  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <Card>
      <CardContent>
        {showAlert && (
          <Alert severity="error">
            This application has already been submitted by{" "}
            {application.clientId}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {application.title}
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
                      onChange={handleChange}
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
                              onChange={handleChange}
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
                    onChange={handleChange}
                    disabled
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
