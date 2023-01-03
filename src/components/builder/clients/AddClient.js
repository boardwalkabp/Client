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
} from "@mui/material";
import { Box } from "@mui/system";

export default function AddClient() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

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
    temp.name = /^[A-Z][-a-zA-Z]+$/.test(values.name)
      ? ""
      : "Name is not valid. Must be at least 2 characters long and contain only letters. Must start with a capital letter. Cannot contain numbers or special characters.";
    temp.email = /.+@.+\.[A-Za-z]+$/.test(values.email)
      ? ""
      : "Email is not valid. Must be in the format: name@email.com or name@email.ca or name@email.co.uk";
    // temp.username = values.username ? "" : "This field is required.";
    temp.username =
      /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
        values.username
      )
        ? ""
        : "Username is not valid. Must be at least 5 characters long and contain only letters, numbers, periods and underscores. Cannot start or end with a period or underscore. Cannot contain two periods or underscores in a row.";
    temp.password =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(
        values.password
      )
        ? ""
        : "Password is not valid. Must contain at least one number, one uppercase and lowercase letter, one special charecter and a minimum length of 6 characters.";
    temp.confirmPassword = values.confirmPassword
      ? ""
      : "This field is required.";
    temp.phoneNumber = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(
      values.phoneNumber
    )
      ? ""
      : "Phone number is not valid. Must be in the format: 123-456-7890 or (123) 456-7890 or 123 456 7890 or 123.456.7890 or +91 (123) 456-7890";
    temp.address =
      /[0-9]{1,5}( [a-zA-Z.]*){1,4},?( [a-zA-Z]*){1,3},? [a-zA-Z]{2},? [0-9]{5}/.test(
        values.address
      )
        ? ""
        : "Address is not valid. Must be in the format: 1234 Main St, Anytown, ON, A1A 1A1";

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
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Add a Client
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                  disabled={
                    !name ||
                    !email ||
                    !username ||
                    !password ||
                    !confirmPassword ||
                    !phoneNumber ||
                    !address
                  }
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
