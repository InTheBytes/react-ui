import {Container, makeStyles, Typography} from "@material-ui/core";
import React from "react";

function ConfirmEmail() {

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}
	}));

	const classes = useStyles();


	return (
		<Container component="main">
			<div className={classes.paper}>
				<Typography component="h1" variant="h4">
					Success! Please check your email for a link to confirm your account.
				</Typography>
			</div>
		</Container>
	);
}

export default ConfirmEmail;