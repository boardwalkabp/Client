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
} from "@mui/material";


export default function AddApplication() {
  const [values, setValues] = useState({
    title: "",
  });

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
