import React, { useState, useEffect } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";
import {
  ProfileEditor,
  PasswordChangeForm,
  ContactInformationForm,
} from "./ProfileEditor";

function Profile(props) {
  const [profile, setProfile] = useState(null);
  const [isEditDetails, setIsEditDetails] = useState(true);
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [submitFunct, setSubmitFunct] = useState(() => {});

  function fetchPage() {
    return axios
      .get(`${process.env.REACT_APP_SL_API_URL}/user/profile`, {
        headers: { Authentication: props.auth },
      })
      .then((resp) => {
        setProfile(resp.data);
      });
  }

  useEffect(() => {
    fetchPage();
  }, []);

  const editor = (
    <>
    {/* <AuthContext.Consumer> */}
      {
        (value = (
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Button
                onClick={() => {
                  setIsEditDetails(!isEditDetails);
                }}
                color="primary"
              >
                {isEditDetails ? "Change Password" : "Edit Information"}
              </Button>
            </Grid>
            <Grid item xs={12} md={9}>
              {isEditDetails ? (
                <ContactInformationForm
                  profile={profile}
                  auth={value}
                  setSubmit={setSubmitFunct}
                />
              ) : (
                <PasswordChangeForm auth={value} setSubmit={setSubmitFunct} />
              )}
            </Grid>
          </Grid>
        ))
      }
    {/* </AuthContext.Consumer> */}
    </>
  );

  return (
    <>
      <Grid container spacing={2} id="profileGrid" alignItems="center">
        <Grid item xs={12} sm={4} id="editOptionsContianer">
          <Button onClick={() => setIsEditorOpened(true)}>Edit Profile</Button>
        </Grid>
        <Grid item xs={8} sm={8}>
          {profile == null ? (
            <CircularProgress color="secondary" aria-label="loading circle" />
          ) : (
            <ProfileDetails profile={profile} />
          )}
        </Grid>
      </Grid>
      <ProfileEditor
        open={isEditorOpened}
        child={editor}
        title={isEditDetails ? "Edit Contact Information" : "Change Password"}
        onCancel={() => setIsEditorOpened(false)}
        onSubmit={submitFunct}
      />
    </>
  );
}

export default Profile;
