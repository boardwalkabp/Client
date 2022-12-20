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
} from "@mui/material";
import $ from "jquery";

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

  const fetchApplication = async () => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let answers = [];
    questions.forEach((question) => {
      let answer = {
        questionId: question.id,
        value: "",
      };
      if (question.questionType === "Radio") {
        answer.value = $(`input[name=${question.id}]:checked`).val();
      } else if (question.questionType === "CheckBox") {
        let checkedValues = [];
        $(`input[name=${question.id}]:checked`).each(function () {
          checkedValues.push($(this).val());
          answer.value = checkedValues.toString().replace(/,/g, ", ");
        });
      } else if (question.questionType === "Text") {
        answer.value = $(`input[name=${question.id}]`).val();
      }
      answers.push(answer);
    });
    setValues({ ...values, answers: answers });
    application.answers = answers;
    application.completedAt = new Date().toISOString();
    application.status = "Completed";
    console.log(application);
    createAPIEndpoint(ENDPOINTS.applications)
      .put(id, application)
      .then((res) => {
        setSuccess("Application submitted successfully");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        setLoading(false);
        setTimeout(() => {
          navigate("/viewer/applications");
        }, 4000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {application.title}
            </Typography>
          </Grid>
          {questions.map((question, index) => {
            let question_title = question.body;
            let question_id = question.id;
            let question_type = question.questionType;
            let question_choices = question.choices;
            let qNum = 1;

            const question_info = question_choices.map((choice, index) => {
              if (question_type === "Radio") {
                return (
                  <div key={index} className="q_choices qst">
                    <div className="cho_start">
                      <input
                        type="radio"
                        id="radio"
                        name={question_id}
                        value={choice.value}
                        // onChange={handleInputChange}
                        onChange={(e) => {
                          let answers = [...values.answers];
                          answers[index] = e.target.value;
                          setValues({ ...values, answers });
                        }}
                      />
                      <label htmlFor="radio" name={question_id}>
                        {choice.value}
                      </label>
                    </div>
                    <div className="cho_end"></div>
                  </div>
                );
              } else if (question_type === "CheckBox") {
                return (
                  <div key={index} className="q_choices qst">
                    <div className="cho_start">
                      <input
                        type="checkbox"
                        name={question_id}
                        value={choice.value}
                        onChange={(e) => {
                          let answers = [...values.answers];
                          answers[index] = e.target.value;
                          setValues({ ...values, answers });
                        }}
                      />
                      <label htmlFor="checkbox" name={question_id}>
                        {choice.value}
                      </label>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="q_choices qst">
                    <div className="cho_start">
                      <input
                        type="text"
                        name={question_id}
                        onChange={(e) => {
                          let answers = [...values.answers];
                          answers[index] = e.target.value;
                          setValues({ ...values, answers });
                        }}
                      />
                    </div>
                  </div>
                );
              }
            });
            return (
              <Grid key={index} item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <div
                    className="added_question"
                    key={index}
                    data-order={qNum}
                    data-question={question_id}
                  >
                    <div className="qst_order">
                      <div className="a_q_title">
                        <h4>{question_title}</h4>
                      </div>
                    </div>
                    <div className="que_cho">{question_info}</div>
                    <input
                      type="hidden"
                      name="questions[]"
                      value={question_id}
                    />
                  </div>
                </Typography>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Application submitted successfully!
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
