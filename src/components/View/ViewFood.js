import React, {useEffect, useState} from 'react';
import {Container, Typography, makeStyles, Button} from '@material-ui/core';
import Axios from "axios";
import {Link as RouterLink, useParams} from "react-router-dom";

function ViewFood(props) {

	let { id } = useParams();

	const [results, setResults] = useState({});

	function getFood(id) {
		let url = "http://localhost:8082/foods";
		url += "?foodId=" + id;

		Axios.get(url)
			.then((results) => {
				console.dir(results);

				setResults(results.data);
			}, err => {
				console.log("Error getting food.")
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
					{results?.['name']} - ${results?.['price']}
				</Typography>
				<Typography>
					{results?.['description']}
				</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					component={RouterLink}
					to={"/cart/"+ results?.['foodId']}
				>
					Add to cart
				</Button>
			</div>
		</Container>
	);

}

export default ViewFood;