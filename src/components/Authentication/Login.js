import React, {useState} from 'react';
import {Container, Typography, TextField, Button, Box, Link, makeStyles, CircularProgress, Backdrop} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import Axios from "axios";
import {useHistory} from "react-router-dom";

function Login(props) {

	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	let handleSubmit = props.onSubmit ?? ((evt) => {
		evt.preventDefault();

		setLoading(true);

		Axios.post(`${process.env.REACT_APP_SL_API_URL}/login`, {
			username: evt.target.elements.username.value,
			password: evt.target.elements.password.value
		}).then((response) => {
			setLoading(false);

			if (response.headers['authentication'].length > 0) {
				props.setAuth(response.headers['authentication']);
				history.push("/search");
			} else {
				setMessage("Authentication error.");
			}
		}, err => {
			setLoading(false);

			setMessage("Authentication error.");
		});
	});

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
			margin: theme.spacing(3, 0, 3),
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	}));

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h4">
					Login to StackLunch
				</Typography>
				{message.length > 0 && (
					<Alert severity="error">{message}</Alert>
				)}
				<form className={classes.form} onSubmit={handleSubmit}>
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
						fullWidth
						className={classes.submit}
					>
						Login
					</Button>
				</form>
			</div>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress size={24} />
			</Backdrop>
			<Box position="bottom">
				Don't have an account? <Link href="/register">Sign Up</Link>
			</Box>
		</Container>
	);
}

export default Login;