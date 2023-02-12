import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
// import { Button, AppBar, IconButton, Toolbar, Typography, TextField, InputLabel, Input, FormHelperText, Grid } from '@material-ui/core';
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import { FormControl } from '@mui/material';
import { signup } from '../httpRequest'

interface AppProps {
  arg: string;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

const Signup = () => {
  const { heading, submitButton } = useStyles();

  const [name, setName] = React.useState<String | null>(null);
  const [email, setEmail] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);

  const handleCheckbox = (e) => {
    console.log("checkbox--->", e.target.checked)
  }

  const clickSignup = (e) => {
    // e.preventDefault();
    console.log("click signup---->")
    console.log("name--->", name)
    console.log("email--->", email)
    console.log("password--->", password)
  }

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign Up Form
      </Typography>
      <form>
      <TextField
          variant="outlined"
          margin="normal"
          label="First"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" onChange={handleCheckbox} />}
          label="I want to receive inspiration, marketing promotions and updates via email."
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
          onClick={clickSignup}
        >
          Sign Up
        </Button>
        <Link href="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </form>
    </Container>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("home");
  ReactDOM.render(<Signup />, rootEl);
});
