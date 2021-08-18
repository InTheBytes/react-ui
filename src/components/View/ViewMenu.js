import React, {useEffect, useState} from 'react';
import {Container, makeStyles} from '@material-ui/core';
import Axios from "axios";
import {useParams} from "react-router-dom";
import {Pagination} from "@material-ui/lab";

function ViewMenu(props) {

	let { id } = useParams();

	const [results, setResults] = useState({});
	const [page, setPage] = useState(1);

	const handleChange = (event, value) => {
		setPage(value);
	};

	function getRestaurant(id) {
		let url = `${process.env.REACT_APP_SL_API_URL}/apis/restaurant/${id}`;

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
		let url = `${process.env.REACT_APP_SL_API_URL}/search/menu/${id}?page=${page}`;

		Axios.get(url)
			.then((results) => {
				console.dir(results);

				setResults(results.data);
			}, err => {
				console.log("Error getting food.")
			});
	}, [id, page]) // <-- empty dependency array

	const classes = useStyles();

	getRestaurant(id);

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<ul className="resultList">
				{results.content?.map(data => (
					<li id={`food-${data['foodId']}`}>
						<a href={`foods/${data['foodId']}`}>
							<span className="resultImage"><img src={"/logo.png"} alt={`${data['name']}`} width="30px" /></span>
							<span className="resultName">{data['name']}</span>
							<span className="resultDetail">${data['price']}</span>
						</a>
					</li>
				))}
				</ul>
				<Pagination className="resultPagination" page={results['number']+1} count={results['totalPages']} onChange={handleChange} />
			</div>
		</Container>
	);

}

export default ViewMenu;