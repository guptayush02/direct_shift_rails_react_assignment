import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  TextField,
  Button
} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import { referral } from '../httpRequest'
import Toast from "./Toast";
import { checkToken } from "../helper";

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

const Dashboard = () => {
  const { heading, submitButton } = useStyles();

  const [email, setEmail] = React.useState<String | null>(null);
  const [openToast, setOpenToast] = React.useState(false);
  const [message, setMessage] = React.useState<String | null>(null);
  const [isLoading, setIsLoading] = React.useState<Boolean | false>(false);

  React.useEffect(() => {
    checkToken()
  }, [])

  const handleClose = () => {
    setOpenToast(false)
  }

  const clickReferral = async(e) => {
    try {
      e.preventDefault();
      if (!email) {
        setOpenToast(true)
        return setMessage("Parameter Missing")
      }
      setIsLoading(true)
      const body = { email }
      const result = await referral(body)
      setIsLoading(false)
      setOpenToast(true)
      return setMessage(result.message)
    } catch (err) {
      setIsLoading(false)
      setOpenToast(true)
      return setMessage(err)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('ds_token')
    sessionStorage.removeItem('user')
    location.href = 'login'
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Direct Shifts Assignment
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Referral
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
        {
          isLoading ?
          <CircularProgress />
          :
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
            onClick={clickReferral}
          >
            Send
          </Button>
        }
        {/* Toast */}
        <Toast openToast={openToast} handleClose={handleClose} message={message} />
      </form>
    </Container>
    </Box>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("dashboard");
  ReactDOM.render(<Dashboard />, rootEl);
});
