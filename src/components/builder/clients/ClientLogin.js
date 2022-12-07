import React from "react";
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import Center from "../../layout/Center";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function UserLogin() {
  const { setContext } = useStateContext();
  // console.log(context);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    let temp = {};
    temp.username = values.username ? "" : "This field is required.";
    temp.password = values.password ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        createAPIEndpoint(ENDPOINTS.loginClient)
          .post(values)
          .then((res) => {
            setContext(res.data);
            if (res.data.username !== null) {
              navigate("/viewer/home");
            }
            if (res.data.username === null) {
              setErrors({
                ...errors,
                username: res.data.message,
                password: res.data.message,
              });
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ my: 3 }}>
                Application Building Platform
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                label="Username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                {...(errors.username && {
                  error: true,
                  helperText: errors.username,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                size="large"
                sx={{ width: "50%" }}
                style={{ backgroundColor: '#FF7753' }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Center>
  );
}
