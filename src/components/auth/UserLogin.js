import React from "react";
import useStateContext from "../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Center from "../layout/Center";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";

export default function UserLogin() {
  const navigate = useNavigate();
  const { context, setContext } = useStateContext();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("User not found");
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

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
        createAPIEndpoint(ENDPOINTS.loginUser)
          .post(values)
          .then((res) => {
            setContext(res.data);
            if (res.data.username !== null) {
              navigate("/builder/home");
              // console.log(res.data);
            }
            if (res.data.username === null) {
              setShowAlert(true);
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

  // const handleForgetPassword = () => {
  //   navigate("/forget-password");
  // };

  const handleClose = () => {
    setShowAlert(false);
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
              {showAlert && (
                <Alert severity="error" onClose={handleClose}>
                  {error}
                </Alert>
              )}
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
                sx={{
                  width: "50%",
                  bgcolor: "#FF7753",
                  "&:hover": {
                    bgcolor: "#FF7753",
                  },
                  "&:disabled": {
                    bgcolor: "#ccc",
                  },
                }}
                disabled={values.username === "" || values.password === ""}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p>
                Are you new here? <Link href="/register"> Register</Link>
              </p>
              <p>
                Want to sign in as a client?{" "}
                <Link href="/viewer/login"> Login</Link>
              </p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Center>
  );
}
