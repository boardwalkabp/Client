import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";

export default function UserRegister() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("Invalid username.");
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
    temp.phoneNumber = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(
      values.phoneNumber
    )
      ? ""
      : "Phone number is not valid. Must be in the format: 123-456-7890 or (123) 456-7890 or 123 456 7890 or 123.456.7890 or +91 (123) 456-7890";
    temp.address =
      /^([\d\s]+\w+)\s(St|Ave|Rd|Blvd|Dr|Cres|Way|Pky|Crt)\s?,\s?([\w\s]+),\s([A-Z]{2})\s([A-Z]\d[A-Z]\s?\d[A-Z]\d)$/.test(
        values.address
      )
        ? ""
        : "Address is not valid. Must be in the format of: 123 Main St, Toronto, ON M1M 1M1.";

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
          if (res.data.statusCode === 1) {
            navigate("/");
          } else {
            setShowAlert(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match.",
      });
    } else {
      setErrors({
        ...errors,
        confirmPassword: "",
      });
    }
  }, [password, confirmPassword]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box sx={{ pt: 0, pb: 4, pr: 2, pl: 2 }}>
      <Card
        sx={{
          height: "auto",
          padding: "20px",
          margin: "20px",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5">Register as a User</Typography>
          <br />

          <Grid item xs={12}>
            {showAlert && (
              <Alert severity="error" onClose={handleCloseAlert}>
                {error}
              </Alert>
            )}
            <br />
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
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
                    !confirmPassword ||
                    !password ||
                    !username ||
                    !email ||
                    !name ||
                    !phoneNumber ||
                    !address ||
                    confirmPasswordError
                      ? true
                      : false
                  }
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
