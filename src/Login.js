import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(credentials) {
  return fetch("https://www.melivecode.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login() {


  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/aboutpage";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        component={Paper}
        style={{ minHeight: "100vh" }}
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} 
          // noValidate 
          onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              InputProps={{ inputProps: { minLength: 8 } }}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputProps={{ inputProps: { minLength: 8 } }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}