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
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function EditQuestion() {
  const [question, setQuestion] = useState({});
  const [values, setValues] = useState({
    body: "",
    type: "",
    questionType: "",
    choicesQuestion: [],
    mous: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const fetchQuestion = async () => {
    createAPIEndpoint(ENDPOINTS.questions)
      .fetchById(id)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

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
    // temp.body = values.body ? "" : "This field is required.";
    // temp.type = values.type ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.questions)
        .put(id, question)
        .then((res) => {
          navigate("/builder/questions");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: value,
    });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {question.body}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="body"
              label="Question"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
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
          {(values.questionType === "CheckBox" ||
            values.questionType === "Radio") && (
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
                          ),
                        })
                      }
                      {...(errors.points && {
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
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
