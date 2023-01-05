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
  Alert,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import SaveIcon from "@mui/icons-material/Save";

export default function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const validate = () => {
    let temp = {};
    temp.name = values.name ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.categories)
        .post(values)
        .then((res) => {
          setShowAlert(true);
          // navigate("/builder/categories");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (id) {
      createAPIEndpoint(ENDPOINTS.categories)
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
          {id ? "Edit a Category" : "Add a Category"}
        </Typography>
        <br />
        {showAlert && (
          <Grid item xs={12}>
            <Alert severity="success" onClose={() => setShowAlert(false)}>
              Category saved successfully! Please click on{" "}
              <Link href="/builder/categories">here</Link> to view all
              categories.
            </Alert>
            <br />
          </Grid>
        )}
        <Box sx={{ mt: 3 }}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      name: e.target.value,
                    });
                  }}
                  {...(errors.name && {
                    error: true,
                    helperText: errors.name,
                  })}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<SaveIcon />}
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={Object.values(values).every((x) => x === "")}
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
