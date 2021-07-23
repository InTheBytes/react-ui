import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { passwordValidator } from "./ValidatorRegEx";

function ResetPassword(props) {
  const history = useHistory();
  let { token } = useParams();
  const [validations, setValidations] = useState({});
  const [message, setMessage] = useState("");

  const checkValidation = (name) => {
    return Object.keys(validations).includes(name);
  };

  const validate = (elements) => {
    let newValidation = {};
    if (!passwordValidator.test(elements.password.value)) {
      newValidation["password"] =
        "Password must contain at least 8 characters, including upper/lowercase and numbers";
    }
    if (elements.password.value !== elements.passwordConfirm.value) {
      newValidation["passwordConfirm"] = "Password confirmation does not match";
    }
    return newValidation;
  };

  const submit = (evt) => {
    evt.preventDefault();
    let form = evt.target.elements;
    let newValidations = validate(form);

    if (Object.keys(newValidations).length > 0) {
      setValidations(newValidations);
      return;
    } else {
      setValidations({});
    }
    
    let uri = `${process.env.REACT_APP_SL_API_URL}/user/profile/password?token=${token}`;
    axios
      .put(uri, form.password.value, {
        headers: { "Content-Type": "text/plain" },
      })
      .then(
        (resp) => {
          history.push("/login");
        },
        (err) => {
          setMessage(
            err.response.status === 404
              ? "Password reset address is invalid"
              : "An error occured resetting your password"
          );
          setTimeout(() => setMessage(""), 3000);
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h4">
        Change Password
      </Typography>
      <form onSubmit={submit}>
        {message.length > 0 && <Alert severity="error">{message}</Alert>}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={checkValidation("password")}
          helperText={validations["password"]}
          name="password"
          label="Password"
          type="password"
          id="password"
          aria-label="password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={checkValidation("passwordConfirm")}
          helperText={validations["passwordConfirm"]}
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          id="passwordConfirm"
          aria-label="passwordConfirm"
        />
        <Button
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          color="primary"
        >
          Change Password
        </Button>
      </form>
    </Container>
  );
}

export default ResetPassword;
