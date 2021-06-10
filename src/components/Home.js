import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";

function Home() {

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
				<Typography component="h1" variant="h2">
					Welcome to StackLunch
				</Typography>
			</div>
		</Container>
	);
}

export default Home;