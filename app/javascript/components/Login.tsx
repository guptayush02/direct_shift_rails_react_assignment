import * as React from "react";
import * as ReactDOM from "react-dom";
// import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { signIn, dashboard } from '../httpRequest'
import Toast from "./Toast";
import { checkLogin } from "../helper";

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

const Login = () => {

  React.useEffect(() => {
    checkLogin()
  }, []);

  // const checkLogin = () => {
  //   if (!sessionStorage.getItem("ds_token") || !sessionStorage.getItem("user")) {
  //     sessionStorage.removeItem('ds_token')
  //     sessionStorage.removeItem('user')
  //     return true
  //   } else {
  //     return history.back();
  //   }
  // }

  const { heading, submitButton } = useStyles();

  const [email, setEmail] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);
  const [openToast, setOpenToast] = React.useState(false);
  const [message, setMessage] = React.useState<String | null>(null);

  const clickSignup = async(e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setOpenToast(true)
        return setMessage("Parameter Missing")
      }

      const body = {
        email, password
      }
      const result = await signIn(body)
      if (result.status === 200) {
        const user = {
          ...result.data
        }
        delete user.token
        sessionStorage.setItem("user", JSON.stringify(user))
        sessionStorage.setItem("ds_token", result.data.token)
        location.href = 'dashboard'
      }
      setMessage(result.message)
      return setOpenToast(true);
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
        Sign In Form
      </Typography>
      <form>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
          onClick={clickSignup}
        >
          Sign In
        </Button>
        {/* Toast */}
        <Toast openToast={openToast} handleClose={handleClose} message={message} />
        <Link href="/" variant="body2">
          Don't have account? Sign up
        </Link>
      </form>
    </Container>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("login");
  ReactDOM.render(<Login />, rootEl);
});
