import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

function ChangePassword(props) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [linkSent, setLinkSent] = useState(false);

  const uri = `${process.env.REACT_APP_SL_API_URL}/user/profile/password/token?username=${props.username}`;

  const send = () => {
    axios.get(uri).then(
      (resp) => {
        setLinkSent(true);
      },
      (err) => {
        setMessage("Failed to send reset link. Please try again later");
        setTimeout(() => setMessage(""), 5000);
      }
    );
  };

  const close = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        {message.length > 0 && <Alert severity="error">{message}</Alert>}
        {linkSent
          ? "Check your email for the password reset link within the next 30 minutes."
          : 'Click "Send" to send an email with the link to reset your password'}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color={linkSent ? "primary" : "secondary"}>
          Cancel
        </Button>
        {!linkSent && (
          <Button onClick={send} color="primary">
            Send
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ChangePassword;
