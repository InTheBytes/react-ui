import React, {useEffect, useState} from 'react';
import {Container, Typography, makeStyles} from '@material-ui/core';
import Axios from "axios";
import {useParams} from "react-router-dom";
import {Pagination} from "@material-ui/lab";

function ViewRestaurant(props) {

	let { id } = useParams();

	const [restaurantResults, setRestaurantResults] = useState({});
	const [menuResults, setMenuResults] = useState({});
	const [page, setPage] = useState(1);

	const handleChange = (event, value) => {
		setPage(value);
	};

	function getRestaurant(id) {
		let url = `${process.env.REACT_APP_SL_API_URL}/apis/restaurant/${id}`;

		Axios.get(url)
			.then((results) => {
				console.dir(results);

				setRestaurantResults(results.data);
			}, err => {
				console.log("Error getting restaurant.")
			});
	}

	function getMenu(id) {
		let url = `${process.env.REACT_APP_SL_API_URL}/search/menu/${id}?page=${page}`;

		Axios.get(url)
			.then((results) => {
				console.dir(results);

				setMenuResults(results.data);
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
		getRestaurant(id);
		getMenu(id);
	}, [id, page]) // <-- empty dependency array

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<img src={"/logo.png"} alt={restaurantResults?.['name']} />
				<Typography component="h1" variant="h5">
					{restaurantResults?.['name']}
				</Typography>
				<Typography>
					{restaurantResults?.['cuisine']}
				</Typography>
				<Typography>
					{restaurantResults?.['location']?.['street']} {restaurantResults?.['location']?.['unit']}
				</Typography>
				<Typography>
					{restaurantResults?.['location']?.['city']}, {restaurantResults?.['location']?.['state']} {restaurantResults?.['location']?.['zipCode']}
				</Typography>
				<Typography component="h1" variant="h5">
					Menu
				</Typography>
				<ul className="resultList">
					{menuResults.content?.map(data => (
						<li id={`food-${data['foodId']}`}>
							<a href={`foods/${data['foodId']}`}>
								<span className="resultImage"><img src={"/logo.png"} alt={`${data['name']}`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">${data['price']}</span>
							</a>
						</li>
					))}
				</ul>
				<Pagination className="resultPagination" page={menuResults['number']+1} count={menuResults['totalPages']} onChange={handleChange} />
			</div>
		</Container>
	);

}

export default ViewRestaurant;