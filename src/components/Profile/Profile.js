import React, { useState, useEffect } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import axios from "axios";

import ProfileDetails from "./ProfileDetails";
import ProfileEditor from "./Editors/ProfileEditor";

function Profile(props) {
  const [profile, setProfile] = useState(null);
  const [isEditorOpened, setIsEditorOpened] = useState(false);

  function fetchPage() {
    return axios.get(`${process.env.REACT_APP_SL_API_URL}/user/profile`, {
      headers: { Authentication: props.auth },
    });
  }

  useEffect(() => {
    fetchPage().then((resp) => {
      setProfile(resp.data);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2} id="profileGrid" alignItems="center">
        <Grid item xs={12} sm={5}>
          {profile == null ? (
            <CircularProgress color="secondary" aria-label="loading circle" />
          ) : (
            <ProfileDetails profile={profile} />
          )}
        </Grid>
        <Grid item xs={12} id="editOptionsContianer">
          <Button onClick={() => setIsEditorOpened(true)}>Edit Profile</Button>
        </Grid>
      </Grid>
      <ProfileEditor
        profile={profile}
        open={isEditorOpened}
        onCancel={() => setIsEditorOpened(false)}
        updateProfile={(newDetails) => setProfile(newDetails)}
      />
    </>
  );
}

export default Profile;
