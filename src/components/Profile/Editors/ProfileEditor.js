import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import React, { useState } from "react";
import AuthContext from "../../Authentication/AuthContext";
import EditContactInfo from "./EditContactInfo";
import EditPassword from "./EditPassword";

function ProfileEditor(props) {
  const [isContactInfo, setIsContactInfo] = useState(true);
  const [title, setTitle] = useState("Edit Contact Information");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [noValidSubmit, setNoValidSubmit] = useState(false);
  const [hadError, setHadError] = useState(false);
  const [editComplete, setEditComplete] = useState(false);

  const setContentToAttribute = (content) => {
    return content.toLowerCase().replace(" ", "-");
  };

  const updateProfileInfo = (email, phone) => {
    let profile = props.profile;
    profile.email = email;
    profile.phone = phone;
    props.updateProfile(profile);
  };

  const confirmationText = () => {
    setNoValidSubmit(true);
    let operation = isContactInfo ? "contact information" : "password";
    let description = hadError
      ? "An error occured trying to change your "
      : "Successfully changed your ";
    return <p>{description + operation}.</p>;
  };

  const switchForms = () => {
    let passTitle = "Change Password";
    let contactTitle = "Edit Contact Information";
    setIsContactInfo(!isContactInfo);
    setTitle(title == passTitle ? contactTitle : passTitle);
  };

  return (
    <Dialog open={props.open} aria-labelledby={setContentToAttribute(title)}>
      <DialogTitle id={setContentToAttribute(title)}>{title}</DialogTitle>
      <form onSubmit={props.onSubmit}>
        <DialogContent>
          <Button onClick={switchForms} disabled={isContactInfo}>
            Contact Information
          </Button>
          <Button onClick={switchForms} disabled={!isContactInfo}>
            Password
          </Button>
          <AuthContext.Consumer>
            {(value) =>
              editComplete ? (
                confirmationText()
              ) : isContactInfo ? (
                <EditContactInfo
                  deny={() => setSubmitDisabled(true)}
                  auth={value}
                />
              ) : (
                <EditPassword
                  deny={() => setSubmitDisabled(true)}
                  auth={value}
                />
              )
            }
          </AuthContext.Consumer>
        </DialogContent>
        <DialogActions>
          {noValidSubmit ? (
            <Button onClick={() => props.onCancel()} color="primary">
              Okay
            </Button>
          ) : (
            <>
              <Button onClick={props.onCancel} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={submitDisabled}
                onSubmit={props.onSubmit}
              >
                Submit
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProfileEditor;
