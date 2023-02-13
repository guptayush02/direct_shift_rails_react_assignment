import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
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
import { Snackbar, IconButton } from '@mui/material';
import { createUser } from '../httpRequest'
import CloseIcon from '@mui/icons-material/Close';
import Toast from "./Toast";
import { checkLogin } from "../helper";

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

  React.useEffect(() => {
    checkLogin()
  }, [])

  const { heading, submitButton } = useStyles();

  const [name, setName] = React.useState<String | null>(null);
  const [email, setEmail] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);
  const [confirmPassword, setConfirmPassword] = React.useState<String | null>(null);
  const [termsAndCondition, setTermsAndCondition] = React.useState<Boolean | null>(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [message, setMessage] = React.useState<String | null>(null);

  const handleCheckbox = (e) => {
    setTermsAndCondition(e.target.checked);
  }

  const clickSignup = async (e) => {
    try {
      e.preventDefault();
      if (name && email && password && termsAndCondition && confirmPassword) {
        if (password === confirmPassword) {
          const body = {
            name, email, password, termsAndCondition
          }
          const result = await createUser(body);
          setMessage(result.message)
          return setOpenToast(true)
        } else {
          setMessage("Password Not Match")
          return setOpenToast(true)
        }
      } else {
        setMessage("Params Missing");
        return setOpenToast(true)
      }
    } catch (err) {
      setMessage(err);
      return setOpenToast(true);
    }
  }

  const handleClose = () => {
    setOpenToast(false)
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
          label="Name"
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
         <TextField
          variant="outlined"
          margin="normal"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" onChange={handleCheckbox} />}
          label="Terms And Condition"
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
        {/* Toast */}
        <Toast openToast={openToast} handleClose={handleClose} message={message} />
        {/* <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        /> */}
        <Link href="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </form>
    </Container>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("signup");
  ReactDOM.render(<Signup />, rootEl);
});
