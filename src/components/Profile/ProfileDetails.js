import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';

function ProfileDetails(props) {

    const formatPhone = (phone) => {
      let nums = phone.split("").filter((x) => !(isNaN(x)))
      if (nums.length >= 11) {
        nums = nums.slice(-10);
      }
      nums = nums.join('');
      return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`
    }
  
    return (
      <Grid container spacing={0} id="profileDetails" alignItems="center" aria-label="profile details">
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
          <p>{props.profile.email}</p>
        </Grid>
          <Divider variant="middle" />
        <Grid item xs={12}>
          <label htmlFor="phone">
            Phone Number:
          </label>
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <p>{formatPhone(props.profile.phone)}</p>
        </Grid>
      </Grid>
    );
  }

  export default ProfileDetails;