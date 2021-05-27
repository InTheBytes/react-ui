import React from 'react';
import {Box, Button, Container, Link, makeStyles, TextField, Typography, Grid} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import Axios from "axios";

function Register(props) {

	const history = useHistory();

	function handleSubmit(evt) {
		evt.preventDefault();

		if (evt.target.elements.password.value === evt.target.elements.passwordConfirm.value && evt.target.elements.fullname.value.indexOf(" ") > 0) {
			Axios.post("http://localhost:8080/user/register", {
				username: evt.target.elements.username.value,
				password: evt.target.elements.password.value,
				email: evt.target.elements.email.value,
				phone: evt.target.elements.phone.value,
				firstName: evt.target.elements.fullname.value.split(" ")[0],
				lastName: evt.target.elements.fullname.value.split(" ")[1],
				role: {
					roleId: 4,
					roleName: "customer"
				},
				"active": 1
			}).then((response) => {
				if (response.status === 201) {
					history.push("/success");
				} else {
					console.error("Registration error.");
				}
			}, err => {
				console.error("Registration error.");
			});
		}
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
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="phone"
								label="Phone"
								id="phone"
								autoComplete="tel"
								aria-label="phone"
							/>
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
			<Box position="bottom">
				Already have an account? <Link href="/login">Login</Link>
			</Box>
		</Container>
	);
}

export default Register;