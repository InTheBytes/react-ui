import React, {useState} from 'react';
import {Box, Button, Container, Link, makeStyles, TextField, Typography, Grid, CircularProgress, Backdrop} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import InputMask from 'react-input-mask';
import Axios from "axios";
import {Alert} from "@material-ui/lab";

function Register(props) {

	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	function handleSubmit(evt) {
		evt.preventDefault();

		if (evt.target.elements.password.value !== evt.target.elements.passwordConfirm.value) {
			setMessage("Password must match");
			return;
		} else if (evt.target.elements.fullname.value.indexOf(" ") === -1) {
			setMessage("Please provide your full name");
			return;
		} else if (isNaN(evt.target.elements.phone.value.replace(/[^\d]/g, '')) || evt.target.elements.phone.value.replace(/[^\d]/g, '').length !== 10) {
			setMessage("Please provide a valid phone number");
			return;
		} else if (isNaN(evt.target.elements.zipCode.value) || evt.target.elements.zipCode.value.length !== 5) {
			setMessage("Please provide a valid Zip Code");
			return;
		}

		setLoading(true);

		Axios.post(`${process.env.REACT_APP_SL_API_URL}/user/register`, {
			username: evt.target.elements.username.value,
			password: evt.target.elements.password.value,
			email: evt.target.elements.email.value,
			phone: evt.target.elements.phone.value.replace(/[^\d]/g, ''),
			firstName: evt.target.elements.fullname.value.split(" ")[0],
			lastName: evt.target.elements.fullname.value.split(" ")[1],
			role: {
				roleId: 4,
				roleName: "customer"
			},
			"active": 1
		}).then((response) => {
			setLoading(false);

			if (response.status === 201) {
				history.push("/success");
			} else {
				setMessage("Registration error.");
			}
		}, err => {
			setLoading(false);

			if (err.response.status === 409) {
				setMessage("Username already exists");
			} else {
				setMessage("Registration error.");
			}
		});
	}

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
		header: {
			textAlign: 'center'
		},
		button: {
			alignContent: 'center',
			margin: theme.spacing(3, 0, 3),
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	}));

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="md">
			<div className={classes.paper}>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={12}>
							<Typography component="h1" variant="h4" className={classes.header}>
								Create a new account
							</Typography>
							{message.length > 0 && (
								<Alert severity="error">{message}</Alert>
							)}
						</Grid>
						<Grid item xs={12} md={6}>
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
								name="email"
								label="Email"
								id="email"
								autoComplete="email"
								aria-label="email"
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
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="passwordConfirm"
								label="Confirm Password"
								type="password"
								id="passwordConfirm"
								autoComplete="current-password"
								aria-label="passwordConfirm"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="fullname"
								label="Full Name"
								name="fullname"
								autoComplete="name"
								aria-label="full name"
								autoFocus
							/>
							<InputMask
								mask="(999) 999-9999"
								maskChar=" "
								>
								{() => <TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="phone"
									label="Phone"
									id="phone"
									autoComplete="tel"
									aria-label="phone"
								/>}
							</InputMask>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="address"
								label="Address"
								id="address"
								autoComplete="street-address"
								aria-label="address"
							/>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										name="city"
										label="City"
										id="city"
										autoComplete="address-level2"
										aria-label="city"
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										name="state"
										label="State"
										id="state"
										autoComplete="address-level1"
										aria-label="state"
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										name="zipCode"
										label="Zip Code"
										id="zipCode"
										autoComplete="postal-code"
										aria-label="zip code"
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} md={3} />
						<Grid item xs={12} md={6} className={classes.button}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								fullWidth
							>
								Register
							</Button>
						</Grid>
						<Grid item xs={12} md={3} />
					</Grid>
				</form>
			</div>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress size={24} />
			</Backdrop>
			<Box position="bottom">
				Already have an account? <Link href="/login">Login</Link>
			</Box>
		</Container>
	);
}

export default Register;