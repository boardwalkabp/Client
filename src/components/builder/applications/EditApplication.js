import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import $ from "jquery";

export default function EditApplication() {
  const [values, setValues] = useState({
    title: "",
    clientId: "",
    categoryId: "",
    questionId: "",
    questions: [],
  });
  const [categoryId, setCategories] = useState([]);
  const [clientId, setClients] = useState([]);
  const [questionId, setQuestions] = useState([]);
  const [questions, setQuestion_branching] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.categories)
      .fetch()
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
    createAPIEndpoint(ENDPOINTS.clients)
      .fetch()
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
    createAPIEndpoint(ENDPOINTS.questions)
      .fetch()
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const validate = () => {
    let temp = {};
    temp.title = values.title ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    if (validate()) {
      if (id) {
        createAPIEndpoint(ENDPOINTS.applications)
          .put(id, values)
          .then((res) => {
            navigate("/builder/applications");
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPOINTS.applications)
          .post(values)
          .then((res) => {
            // console.log(res.data);
            navigate("/builder/applications");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    if (id) {
      createAPIEndpoint(ENDPOINTS.applications)
        .fetchById(id)
        .then((res) => {
          setValues(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {id ? "Edit Application" : "Add Application"}
        </Typography>
        <br></br>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="title"
                label="Title"
                value={values.title}
                onChange={(e) =>
                  setValues({
                    ...values,
                    title: e.target.value,
                  })
                }
                {...(errors.title && {
                  error: true,
                  helperText: errors.title,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.categoryId}
                  label="Select a category"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      categoryId: e.target.value,
                    })
                  }
                >
                  {categoryId.map((item) => (
                    // console.log(item),
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a client
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.clientId}
                  label="Select a client"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      clientId: e.target.value,
                    })
                  }
                >
                  {clientId.map((item) => (
                    // console.log(item),
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className="select_question">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a question
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.questionId}
                  label="Select a question"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      questionId: e.target.value,
                    });

                    // Set selected question to the selected item
                    setSelectedQuestion(
                      questionId.find((item) => item.id === e.target.value)
                    );
                  }}
                >
                  {questionId.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.body}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (!selectedQuestion) {
                    alert("Please select a question");
                  } else {
                    if (
                      !$(".add-question").find(`#${selectedQuestion.id}`).length
                    ) {
                      let question_title = selectedQuestion.body;
                      let question_id = selectedQuestion.id;
                      let question_type = selectedQuestion.questionType;
                      let question_choices = selectedQuestion.choices;
                      let qNum = 1;
                      let conditions =
                        '<select name="conditions[' +
                        question_id +
                        '][xxx]" data-question="' +
                        question_id +
                        '" class="select_condition qSelect"><option value="0">Go to next</option>';
                      let question_info = "";
                      $(".added_question").each(function (i) {
                        conditions +=
                          '<option key="' +
                          question_id +
                          '" value="' +
                          $(this).attr("data-question") +
                          '">Go to: ' +
                          $(this).find("h4").text() +
                          "</option>";
                      });
                      conditions += "</select>";
                      if (question_choices.length > 0) {
                        for (let i = 0; i < question_choices.length; i++) {
                          // console.log(question_choices[i]);
                          if (question_type === "Radio") {
                            question_info +=
                              '<div key="' +
                              question_choices[i].id +
                              '" class="q_choices qst"><div class="cho_start">' +
                              '<input disabled type="radio" id="radio" name="' +
                              question_id +
                              '" value="' +
                              question_choices[i].value +
                              '" />' +
                              '<label for="radio" name="' +
                              question_id +
                              '">' +
                              question_choices[i].value +
                              "</label></div>" +
                              '<div class="cho_end">' +
                              conditions.replace("xxx", i) +
                              "</div></div>";
                          } else {
                            question_info +=
                              '<div key="' +
                              question_choices[i].id +
                              '" class="q_choices qst"><div class="cho_start">' +
                              '<input disabled type="checkbox" name="' +
                              question_id +
                              '" value="' +
                              question_choices[i].value +
                              '" />' +
                              '<label for="checkbox" name="' +
                              question_id +
                              '">' +
                              question_choices[i].value +
                              "</label></div></div>";
                          }
                        }
                      } else {
                        question_info +=
                          '<div key="' +
                          question_id +
                          '" class="q_choices qst"><div class="cho_start">' +
                          '<input disabled type="text" name="' +
                          question_id +
                          '" value="" />' +
                          "</div></div>";
                      }
                      let order_html =
                        '<div key="' +
                        question_id +
                        '" class="updown b_end"><input type="hidden" class="input_order" style="width:20px;" name="order[' +
                        question_id +
                        ']" value="' +
                        qNum +
                        '" /></div>' +
                        '<div class="delete_Button"><input type="button" class="delete_bracnh" value="Delete" /></div>';
                      $(".add-question").append(
                        '<div class="added_question" key="' +
                          question_id +
                          '" data-order="' +
                          qNum +
                          '" data-question="' +
                          question_id +
                          '"><div class="qst_order"><div class="a_q_title"><h4>' +
                          question_title +
                          "</h4></div>" +
                          order_html +
                          '</div><div class="que_cho">' +
                          question_info +
                          "</div>" +
                          '<input type="hidden" name="questions[]" value="' +
                          question_id +
                          '" /></div>'
                      );

                      $(".select_condition").each(function (i) {
                        let q_id = $(this).attr("data-question");
                        if (q_id != question_id) {
                          $(this).append(
                            '<option key="' +
                              question_id +
                              '" value="' +
                              question_id +
                              '">Go to: ' +
                              question_title +
                              "</option>"
                          );
                        }
                      });

                      qNum++;
                      setQuestion_branching([...questions, question_id]);
                      setValues({
                        ...values,
                        questions: [
                          ...values.questions,
                          {
                            value: question_id,
                          },
                        ],
                      });
                    } else {
                      alert("This question already exists");
                    }
                  }
                }}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div className="add-question"></div>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                {id ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
