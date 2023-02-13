import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  makeStyles,
  Container,
  // Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { referral } from '../httpRequest'
import Toast from "./Toast";

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

  React.useEffect(() => {
    console.log("useEffect")
    console.log("token-->", sessionStorage.getItem("ds_token"))
  }, [])

  const handleClose = () => {
    setOpenToast(false)
  }

  const clickReferral = async(e) => {
    e.preventDefault();
    if (!email) {
      setOpenToast(true)
      return setMessage("Parameter Missing")
    }
    const body = { email }
    const result = await referral(body)
    console.log("result--->", result)
    setOpenToast(true)
    return setMessage(result.message)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Direct Shifts Assignment
          </Typography>
          <Button color="inherit">Logout</Button>
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
          onClick={clickReferral}
        >
          Refer
        </Button>
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
