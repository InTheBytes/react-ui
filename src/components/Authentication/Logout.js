import React, {useEffect} from "react";
import {Container, Link, makeStyles, Typography} from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Logout(props) {

	const history = useHistory();

	useEffect(() => {
		props.setAuth("");

		setTimeout(() => {
			history.push('/login');
		}, 2000)
	});

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
		<Container component="main" maxWidth="md">
			<div className={classes.paper}>
				<Typography component="h1" variant="h4">
					Logged out. Redirecting to <Link href="/">home page</Link>.
				</Typography>
			</div>
		</Container>
	);
}

export default Logout;