import React, {useContext, useEffect, useState} from 'react';
import {Container, Typography, makeStyles, Button} from '@material-ui/core';
import Axios from "axios";
import {useParams} from "react-router-dom";
import CartContext from "../Cart/CartContext";

function ViewFood(props) {

	let { id } = useParams();

	const [results, setResults] = useState({});

	const CartSystem = useContext(CartContext);

	function getFood(id) {
		let url = `${process.env.REACT_APP_SL_API_URL}/search/food/${id}`;

		Axios.get(url)
			.then((results) => {
				console.dir(results);

				setResults(results.data);
			}, err => {
				console.log("Error getting food.")
			});
	}

	function addToCart(e, food) {
		let newCart = Object.assign({}, CartSystem.cart);

		if (CartSystem.cart[food['foodId']] === undefined) {
			food['quantity'] = 1;
			newCart[food['foodId']] = food;
		} else {
			newCart[food['foodId']]['quantity']++;
		}

		CartSystem.setCart(newCart);
		props.onAddToCart(true)
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
					onClick={e => {addToCart(e, results)}}
				>
					Add to cart
				</Button>
			</div>
		</Container>
	);

}

export default ViewFood;