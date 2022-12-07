import React from 'react'
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import Center from "../../layout/Center";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function UserRegister() {
  const { context } = useStateContext();
  // console.log(context);
  
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const { name, email, username, password, confirmPassword } = values;
  const { name: nameError, email: emailError, username: usernameError, password: passwordError, confirmPassword: confirmPasswordError } = errors;

  const validate = () => {
    let temp = {};
    temp.name = values.name ? "" : "This field is required.";
    temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid.";
    temp.username = values.username ? "" : "This field is required.";
    temp.password = (/^(?=.{6,}$)/).test(values.password) ? "" : "Must contain at least 6 characters";
    // temp.password = (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/).test(values.password) ? "" : "Must contain at least one number and one uppercase and lowercase letter, special charecter and at least 6 characters";
    temp.confirmPassword = values.confirmPassword ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.registerUser)
        .post(values)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (values.password !== values.confirmPassword)
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match.",
      });
    else setErrors({ ...errors, confirmPassword: "" });
  }, [values.password, values.confirmPassword]);

  return (
    <Center>
     <Card sx={{ width: 400 }}>
      <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h3" sx={{ my: 3 }}>
          Register User
        </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      name: e.target.value,
                    })
                  }
                  value={name}
                  variant="outlined"
                  {...(nameError && { error: true, helperText: nameError })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      email: e.target.value,
                    })
                  }
                  value={email}
                  variant="outlined"
                  {...(emailError && { error: true, helperText: emailError })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      username: e.target.value,
                    })
                  }
                  value={username}
                  variant="outlined"
                  {...(usernameError && { error: true, helperText: usernameError })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  value={password}
                  variant="outlined"
                  {...(passwordError && { error: true, helperText: passwordError })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      confirmPassword: e.target.value,
                    })
                  }
                  type="password"
                  value={confirmPassword}
                  variant="outlined"
                  {...(confirmPasswordError && { error: true, helperText: confirmPasswordError })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#FF7753' }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
      </CardContent>
    </Card>
  </Center>
  );
}
