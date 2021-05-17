import React from 'react';
import {Container, Typography, TextField, Button, Box, Link, makeStyles} from '@material-ui/core';

import './Login.css';

function handleSubmit(evt) {
	evt.preventDefault();
	alert(evt.target.elements.username.value);
}

function Login({ onSubmit = handleSubmit, ...props }) {

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1),

			justifyContent: 'center'
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
			width: '50%'
		},
	}));

	const classes = useStyles();


	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h4">
					Login to StackLunch
				</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						aria-label="username"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						aria-label="password"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						className={classes.submit}
					>
						Login
					</Button>
				</form>
			</div>
			<Box position="bottom">
				<Link href="#" variant="body2">
					{"Don't have an account? Sign Up"}
				</Link>
			</Box>
		</Container>
	);
}

export default Login;