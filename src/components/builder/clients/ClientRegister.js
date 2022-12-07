import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import Center from "../../layout/Center";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function UserRegister() {

  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const {
    name,
    email,
    username,
    password,
    confirmPassword,
    phoneNumber,
    address,
  } = values;
  const {
    name: nameError,
    email: emailError,
    username: usernameError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
    phoneNumber: phoneNumberError,
    address: addressError,
  } = errors;

  const validate = () => {
    let temp = {};
    temp.name = values.name ? "" : "This field is required.";
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.username = values.username ? "" : "This field is required.";
    temp.password = /^(?=.{6,}$)/.test(values.password)
      ? ""
      : "Must contain at least 6 characters";
    // temp.password = (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/).test(values.password) ? "" : "Must contain at least one number and one uppercase and lowercase letter, special charecter and at least 6 characters";
    temp.confirmPassword = values.confirmPassword
      ? ""
      : "This field is required.";
    temp.phoneNumber = values.phoneNumber ? "" : "This field is required.";
    temp.address = values.address ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.registerClient)
        .post(values)
        .then((res) => {
          // console.log(res);
          navigate("/builder/clients");
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
            Add Client
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  error={nameError ? true : false}
                  helperText={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  error={emailError ? true : false}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                  error={usernameError ? true : false}
                  helperText={usernameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  error={passwordError ? true : false}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setValues({ ...values, confirmPassword: e.target.value })
                  }
                  error={confirmPasswordError ? true : false}
                  helperText={confirmPasswordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) =>
                    setValues({ ...values, phoneNumber: e.target.value })
                  }
                  error={phoneNumberError ? true : false}
                  helperText={phoneNumberError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) =>
                    setValues({ ...values, address: e.target.value })
                  }
                  error={addressError ? true : false}
                  helperText={addressError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
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