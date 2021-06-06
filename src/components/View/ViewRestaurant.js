import React, {useEffect, useState} from 'react';
import {Container, Typography, makeStyles, Button} from '@material-ui/core';
import Axios from "axios";
import {Link as RouterLink, useParams} from "react-router-dom";

function ViewRestaurant(props) {

	let { id } = useParams();

	const [results, setResults] = useState({});

	function getFood(id) {
		let url = `${process.env.REACT_APP_SL_API_URL}/restaurants`;
		url += "?restaurantId=" + id;

		Axios.get(url)
			.then((results) => {
				console.dir(results);

				setResults(results.data);
			}, err => {
				console.log("Error getting restaurant.")
			});
	}

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}
	}));

	useEffect(()=>{
		getFood(id);
	}, [id]) // <-- empty dependency array

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<img src={"/logo.png"} alt={results?.['name']} />
				<Typography component="h1" variant="h5">
					{results?.['name']}
				</Typography>
				<Typography>
					{results?.['cuisine']}
				</Typography>
				<Typography>
					{results?.['location']?.['street']} {results?.['location']?.['unit']}
				</Typography>
				<Typography>
					{results?.['location']?.['city']}, {results?.['location']?.['state']} {results?.['location']?.['zipCode']}
				</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					component={RouterLink}
					to={"/menu/"+ results?.['restaurantId']}
				>
					View Menu
				</Button>
			</div>
		</Container>
	);

}

export default ViewRestaurant;