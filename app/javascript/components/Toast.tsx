import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  Button,
} from "@material-ui/core";
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ToastProps {
  openToast: boolean;
  handleClose: () => void;
  message: String | null;
}

export default function Toast({openToast, handleClose, message}: ToastProps) {

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={openToast}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  )
}