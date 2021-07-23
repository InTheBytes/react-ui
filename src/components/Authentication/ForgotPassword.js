import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Alert } from "@material-ui/lab";

function ForgotPassword(props) {
    const [linkSent, setLinkSent] = useState(false);
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    const changeDetails = (val) => {
        setTimeout(() => setContactInfo(val), 1000);
    }

    const close = () => {
        setOpen(false);
        props.onClose();
    }

    const send = () => {
        let param = (contactInfo.includes("@")) ? "email" : "username";
        let uri = `${process.env.REACT_APP_SL_API_URL}/user/profile/password/token?${param}=${contactInfo}`;
        axios.get(uri).then(
            (resp) => {
                setLinkSent(true);
            }, (err) => {
                if (err.response.status === 404) {
                    setMessage("Username or email is not associated with an account");
                } else {
                    setMessage("Something went wrong sending the reset link");
                }
                setTimeout(() => setMessage(""), 3000);
            }
        )
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                Forgot Password
            </DialogTitle>
            <DialogContent>
            {message.length > 0 && <Alert severity="error">{message}</Alert>}
            {linkSent ? "Please check your email for the link to reset your password" : (<>
                <p>Please enter your username or email address</p>
                <TextField onChange={(evt) => changeDetails(evt.target.value)} required fullWidth label="Email or Username"/>
                </>
            )}
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color={linkSent ? "primary" : "secondary"}>
                    {linkSent ? "Okay" : "Cancel"}
                </Button>
                {!linkSent && <Button onClick={send} color="primary">Send Link</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default ForgotPassword;