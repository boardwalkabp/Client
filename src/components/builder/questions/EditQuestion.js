import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  CircularProgress,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function EditQuestion() {
  const [values, setValues] = useState({
    body: "",
    questionType: "",
    choices: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const addInputField = (event) => {
    setValues({
      ...values,
      choices: [...values.choices, { value: "" }],
    });
    event.preventDefault();
  };
  const deleteInputField = (index) => {
    const list = [...values.choices];
    list.splice(index, 1);
    setValues({
      ...values,
      choices: list,
    });
  };
  const validate = () => {
    let temp = {};
    temp.body = values.body ? "" : "This field is required.";
    temp.questionType = values.questionType ? "" : "This field is required.";
    if (values.questionType === "CheckBox" || values.questionType === "Radio") {
      values.choices.forEach((x) => {
        if (!x.value) {
          temp.choices = "This field is required.";
        }
      });
    }

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      createAPIEndpoint(ENDPOINTS.questions)
        .fetchById(id)
        .then((res) => {
          setValues(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        createAPIEndpoint(ENDPOINTS.questions)
          .put(id, values)
          .then((res) => {
            navigate("/builder/questions");
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPOINTS.questions)
          .post(values)
          .then((res) => {
            navigate("/builder/questions");
          })
          .catch((err) => console.log(err));
      }
    }
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
          <Box>
            <Typography variant="h6" component="div">
              {id ? "Edit a Question" : "Add a Question"}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Body"
                      name="body"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          body: e.target.value,
                        })
                      }
                      {...(errors.body && {
                        error: true,
                        helperText: errors.body,
                      })}
                      required
                      value={values.body}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Question Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.questionType}
                        label="Question Type"
                        required
                        onChange={(e) =>
                          setValues({
                            ...values,
                            questionType: e.target.value,
                          })
                        }
                        {...(errors.questionType && {
                          error: true,
                          helpertext: errors.questionType,
                        })}
                      >
                        <MenuItem value={"Text"}>{"Text"}</MenuItem>
                        <MenuItem value={"CheckBox"}>{"CheckBox"}</MenuItem>
                        <MenuItem value={"Radio"}>{"Radio"}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {(values.questionType === "CheckBox" ||
                    values.questionType === "Radio") && (
                    <Grid item xs={12}>
                      <Button
                        style={{ float: "right" }}
                        variant="outlined"
                        color="primary"
                        onClick={addInputField}
                        disabled={values.choices.length === 5}
                      >
                        Add Choices
                      </Button>
                      <br />
                      {values.choices.map((x, i) => {
                        return (
                          <Grid item xs={12} key={i}>
                            <TextField
                              style={{ float: "left" }}
                              fullWidth
                              key={i}
                              id="preference"
                              label={`Choice ${i + 1}`}
                              name="points"
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  choices: values.choices.map((x, j) =>
                                    i === j ? { value: e.target.value } : x
                                  ),
                                })
                              }
                              {...(errors.choices && {
                                error: true,
                                helperText: errors.choices,
                              })}
                              value={x.value}
                              margin="normal"
                            />
                            <br />
                            <Button
                              style={{ float: "right" }}
                              variant="outlined"
                              color="primary"
                              onClick={deleteInputField}
                            >
                              Delete Choice
                            </Button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={
                        !values.questionType ||
                        (values.questionType === "CheckBox" &&
                          values.choices.length < 2) ||
                        (values.questionType === "Radio" &&
                          values.choices.length < 2)
                      }
                    >
                      {id ? "Update" : "Save"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
