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
} from "@mui/material";

export default function EditClient() {
  const [client, setClient] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

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
    temp.phoneNumber = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(
      values.phoneNumber
    )
      ? ""
      : "Phone number is not valid. Must be in the format: 123-456-7890 or (123) 456-7890 or 123 456 7890 or 123.456.7890 or +91 (123) 456-7890";
    temp.address = /^\d+ \w+ \w+, \w+town, \w{2} \w\d\w \d\w\d$/.test(
      values.address
    )
      ? ""
      : "Address is not valid. Must be in the format: 1234 Main St, Anytown, ON M5G 1W6";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const fetchClient = async () => {
    createAPIEndpoint(ENDPOINTS.clients)
      .fetchById(id)
      .then((res) => {
        setClient(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.clients)
        .put(id, client)
        .then((res) => {
          navigate("/builder/clients");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              {client.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              {...(errors.name && {
                error: true,
                helperText: errors.name,
              })}
              required
              value={values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              {...(errors.username && {
                error: true,
                helperText: errors.username,
              })}
              required
              value={values.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              {...(errors.email && {
                error: true,
                helperText: errors.email,
              })}
              required
              value={values.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
              {...(errors.phoneNumber && {
                error: true,
                helperText: errors.phoneNumber,
              })}
              required
              value={values.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              name="address"
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
              {...(errors.address && {
                error: true,
                helperText: errors.address,
              })}
              required
              value={values.address}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                !values.name ||
                !values.username ||
                !values.email ||
                !values.phoneNumber ||
                !values.address
              }
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
