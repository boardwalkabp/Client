import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Button, Typography } from "@mui/material";
import $ from "jquery";

export default function ViewApplication() {
  const [application, setApplication] = useState({});
  const [questions, setQuestions] = useState([]);
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
        // console.log(questionIds);
        createAPIEndpoint(ENDPOINTS.questions)
          .fetch()
          .then((res) => {
            const filteredQuestions = res.data.filter((question) =>
              questionIds.includes(question.id)
            );
            setQuestions(filteredQuestions);
            // console.log(filteredQuestions);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApplication();
    // fetchQuestions();
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
          {questions.map((question) => {
            let question_title = question.body;
            let question_id = question.id;
            let question_type = question.questionType;
            let question_choices = question.choices;
            // let question_info = '';
            let qNum = 1;
            console.log(question_type);
            // const conditions = $('<select>')
            //   .attr('name', `conditions['${question_id}'][xxx]`)
            //   .attr('data-question', question_id)
            //   .addClass('select_condition qSelect')
            //   .append(
            //     $('<option>')
            //       .val(0)
            //       .text('Go to next')
            //   );

            // $('.added_question').each(function (i) {
            //   conditions.append(
            //     $('<option>')
            //       .key(question_id)
            //       .val($(this).attr('data-question'))
            //       .text(`Go to:  ${$(this).find('h4').text()}`)
            //   );
            // });

            const question_info = question_choices.map((choice, i) => {
              if (question_type == "Radio") {
                return (
                  <div key={choice.id} className="q_choices qst">
                    <div className="cho_start">
                      <input
                        disabled
                        type="radio"
                        id="radio"
                        name={question_id}
                        value={choice.value}
                      />
                      <label for="radio" name={question_id}>
                        {choice.value}
                      </label>
                    </div>
                    <div className="cho_end">
                      {/* {conditions.replace("xxx", i)} */}
                    </div>
                  </div>
                );
              } else if (question_type == "CheckBox") {
                return (
                  <div key={choice.id} className="q_choices qst">
                    <div className="cho_start">
                      <input
                        disabled
                        type="checkbox"
                        name={question_id}
                        value={choice.value}
                      />
                      <label for="checkbox" name={question_id}>
                        {choice.value}
                      </label>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={question_id} className="q_choices qst">
                    <div className="cho_start">
                      <input disabled type="text" name={question_id} value="" />
                    </div>
                  </div>
                );
              }
            });

            // if (question_choices.length > 0) {
            //   for (let i = 0; i < question_choices.length; i++) {
            //     if (question_type == 'Radio') {
            //       question_info = <div key="' + question_choices[i].id + '" class="q_choices qst"><div class="cho_start">
            //         <input disabled type="radio" id="radio" name={question_id} value="' + question_choices[i].value + '" />
            //         <label for="radio" name={question_id}>{question_choices[i].value}</label></div>
            //         <div class="cho_end">' + conditions.replace('xxx', i) + '</div></div>;
            //     } else {
            //       question_info = <div><div class="cho_start">
            //         <input disabled type="checkbox" name={question_id} value={question_choices[i].value} />
            //         <label for="checkbox" name={question_id}>{question_choices[i].value}</label></div></div>;
            //     }
            //   }
            // } else {
            //   question_info = <div key={question_id} class="q_choices qst"><div class="cho_start">
            //     <input disabled type="text" name={question_id} value="" />
            //   </div></div>;
            // }
            console.log(question_info);
            return (
              <Grid key={id} item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <div
                    class="added_question"
                    key={question_id}
                    data-order={qNum}
                    data-question={question_id}
                  >
                    <div class="qst_order">
                      <div class="a_q_title">
                        <h4>{question_title}</h4>
                      </div>
                    </div>
                    <div class="que_cho">{question_info}</div>
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
          {/* <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Created At: {application.createdAt}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Updated At: {application.updatedAt}
            </Typography>
          </Grid> */}
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
