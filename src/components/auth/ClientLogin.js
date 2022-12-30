import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import useStateContext from "../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Grid,
  TextField,
  Button,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ClientLogin() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { context, setContext } = useStateContext();
  const [error, setError] = useState("Client not found");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
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
        createAPIEndpoint(ENDPOINTS.loginClient)
          .post(values)
          .then((res) => {
            setContext(res.data);
            if (res.data.username !== null) {
              navigate("/viewer/home");
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

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login as a Client
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Login as a Client
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ width: 400, textAlign: "center" }}>
            <Grid item xs={12}>
              {showAlert && (
                <Alert severity="error" onClose={handleCloseAlert}>
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
                disabled={values.username === "" || values.password === ""}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
