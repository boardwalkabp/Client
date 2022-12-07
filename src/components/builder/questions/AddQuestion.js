import React from 'react'
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, Grid, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

export default function AddQuestion() {
  const [values, setValues] = useState({
    body: "",
    type: "",
    questionType: "",
    choicesQuestion: [],
    mous: [],
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useStateContext();

  const addInputField = (event) => {
    setValues({
      ...values,
      mous: [...values.mous, { value: "" }],
    });
    event.preventDefault();
  };
  const deleteInputField = (index) => {
    const list = [...values.mous];
    list.splice(index, 1);
    setValues({
      ...values,
      mous: list,
    });
  };
  const validate = () => {
    let temp = {};
    temp.body = values.body ? "" : "This field is required.";
    temp.type = values.type ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  // const handleSubmit = (e) => {
  //   console.log(values);
  //   e.preventDefault();
  //   if (validate()) {
  //     if (id) {
  //       createAPIEndpoint(ENDPOINTS.questions)
  //         .put(id, values)
  //         .then((res) => {
  //           navigate("/builder/questions");
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       createAPIEndpoint(ENDPOINTS.questions)
  //         .post(values)
  //         .then((res) => {
  //           navigate("/builder/questions");
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.questions)
      .post(values)
      .then((res) => {
        navigate("/builder/questions");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id) {
      createAPIEndpoint(ENDPOINTS.questions)
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
          {id ? "Edit Question" : "Add Question"}
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
                  }{...(errors.body && {
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
                  <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.questionType}
                    label="Question Type"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        questionType: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"Text"}>{"Text"}</MenuItem>
                    <MenuItem value={"CheckBox"}>{"CheckBox"}</MenuItem>
                    <MenuItem value={"Radio"}>{"Radio"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {(values.questionType === "CheckBox" || values.questionType === "Radio") && (

                <Grid item xs={12}>
                  <button onClick={addInputField}>Add Choices</button>
                  {values.mous.map((x, i) => {
                    return (
                      <Grid item xs={12} key={i}>
                        <TextField
                          key={i}
                          id="preference"
                          label={`Choice ${i + 1}`}
                          name="points"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              mous: values.mous.map((x, j) =>
                                i === j ? { value: e.target.value } : x
                              )
                            })
                          }{...(errors.points && {
                            error: true,
                            helperText: errors.points,
                          })}

                          value={x.value}
                          margin="normal"
                        />
                        <Button onClick={deleteInputField}>Delete</Button>
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
                >
                  {id ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}