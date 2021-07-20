import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { emailValidator } from "../Authentication/ValidatorRegEx";

function EditContactInfo(props) {
  const [validations, setValidations] = useState({});
  const [message, setMessage] = useState("");

  const validate = (elements) => {
    let newValidation = {};
    //VALIDATE FIRST NAME
    if (elements.firstName.value.trim().length == 0) {
      newValidation["firstName"] = "Please provide a valid first name";
    }
    //VALIDATE LAST NAME
    if (elements.lastName.value.trim().length == 0) {
      newValidation["lastName"] = "Please provide a valid last name";
    }
    //VALIDATE EMAIL ADDRESS
    if (!emailValidator.test(elements.email.value)) {
      newValidation["email"] = "Please provide a valid email address";
    }
    //VALIDATE PHONE NUMBER
    if (
      isNaN(elements.phone.value.replace(/[^\d]/g, "")) ||
      elements.phone.value.replace(/[^\d]/g, "").length !== 10
    ) {
      newValidation["phone"] = "Please provide a valid phone number";
    }
    return newValidation;
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    let form = evt.target.elements;
    let newValidation = validate(form);

    if (Object.keys(newValidation).length > 0) {
      setValidations(newValidation);
      return;
    } else {
      setValidations({});
    }

    let profile = props.profile;
    profile.firstName = form.firstName.value;
    profile.lastName = form.lastName.value;
    profile.email = form.email.value;
    profile.phone = form.phone.value;
    axios
      .put(
        `${process.env.REACT_APP_SL_API_URL}/user/${props.profile.userId}`,
        profile,
        {
          headers: {
            Authentication: props.auth,
          },
        }
      )
      .then(
        (resp) => {
          props.updateProfile(resp.data);
          setMessage("Updated profile successfully");
        },
        (err) => {
          setMessage("Failed to update profile");
        }
      );
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edit Contact Information</DialogTitle>
      <form onSubmit={(evt) => onSubmit(evt)}>
        <DialogContent>
          {message.includes("success") ? (
            <p>{message}</p>
          ) : (
            <Grid container spacing={2} alignContent="center">
              {message.length > 0 && <Alert severity="error">{message}</Alert>}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  required
                  error={"firstName" in validations}
                  helperText={validations["firstName"]}
                  defaultValue={props.profile.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  required
                  error={"lastName" in validations}
                  helperText={validations["lastName"]}
                  defaultValue={props.profile.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  name="email"
                  required
                  error={"email" in validations}
                  helperText={validations["email"]}
                  defaultValue={props.profile.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  required
                  error={"phone" in validations}
                  helperText={validations["phone"]}
                  defaultValue={props.profile.phone}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancel} color="secondary">
            {message.includes("success") ? "Okay" : "Cancel"}
          </Button>
          {!message.includes("success") ? (
            <Button type="submit" color="primary">
              Submit
            </Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditContactInfo;
