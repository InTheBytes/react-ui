import React, {useState, useEffect} from "react";
import {
  Grid,
  Button,
  Typography,
  Divider,
  CircularProgress
} from "@material-ui/core";
import axios from 'axios';

function Profile(props) {
  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpened] = useState(false);
  const [passChangeOpen, setPassChangeOpen] = useState(false);

  function fetchPage() {
    return axios
      .get(`${process.env.REACT_APP_SL_API_URL}/user/profile`, {
        headers: { Authentication: props.auth },
      }).then((resp) => {
        setProfile(resp.data);
      });
  }

  useEffect(() => {
    fetchPage()
  }, []);

  const editButtons = [
    { text: "Edit contact information", click: () => setEditOpened(true) },
    { text: "Change Password", click: () => setPassChangeOpen(true) },
  ];

  return (
    <Grid container spacing={2} id="profileGrid" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h1" component="h3" align="left">
          Your Profile
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} id="editOptionsContianer">
        <ProfileOptionsNav buttons={editButtons} />
      </Grid>
      <Grid item xs={8} sm={8}>
        {profile == null ? (
          <CircularProgress color="secondary" aria-label="loading circle"/>
        ) : (
          <ProfileDetails profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

function ProfileDetails(props) {

  const formatPhone = (phone) => {
    const nums = phone.split("").filter((x) => !(isNaN(x)))
    if (nums.length >= 11) {
      nums = nums.slice(-10);
    }
    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`
  }

  return (
    <Grid container spacing={0} id="profileDetails" aria-label="profile details">
      <Grid item xs={12}>
        <Typography component="sub" aria-label="username">
          {props.profile.username}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h4" variant="h2" aria-label="name">
          {`${props.profile.firstName} ${props.profile.lastName}`}
        </Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <label htmlFor="email">
          Email Address:
        </label>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <input id="email" disabled={true} value={props.profile.email}/>
      </Grid>
        <Divider variant="middle" />
      <Grid item xs={12}>
        <label htmlFor="phone">
          Phone Number:
        </label>
      </Grid>
      <Grid item xs={1}/>
      <Grid item xs={10}>
        <input id="phone" disabled={true} value={formatPhone(props.profile.phone)}/>
      </Grid>
    </Grid>
  );
}

function ProfileOptionsNav(props) {
  return (
    <Grid container spacing={1} id="editOptionsGrid" alignItems="center">
      {props.buttons?.map((button) => (
        <Grid item xs={6} sm={12} key={button.text}>
          <Button
            variant="outlined"
            color="primary"
            onClick={button.click}
            aria-label={button.text}
          >
            {button.text}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
export {Profile, ProfileDetails};
