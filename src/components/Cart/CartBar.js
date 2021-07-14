import React from 'react';
import {SwipeableDrawer, Typography, ButtonGroup, Button} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import './CartBar.css';
import CartContext from "./CartContext";

function CartBar(props) {

	let toggleDrawer = (open) => {
		return () => {
			props.setDrawer(open);
		}
	};

	return (
		<SwipeableDrawer
			anchor={'right'}
			open={props.drawer}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
			role="sidebar"
			className="sideBar"
		>
			<CartContext.Consumer>
				{(context) => {

					console.dir(context.cart)

					let handleIncrease = (e, food) => {
						let newCart = context.cart;

						newCart[food['foodId']].quantity++;

						context.setCart(newCart)
					}

					let handleDecrease = (e, food) => {
						let newCart = context.cart;

						newCart[food['foodId']].quantity--;

						context.setCart(newCart)
					}

					return Object.keys(context.cart).map((foodId, index) => {
						let food = context.cart[foodId];

						if (food.quantity > 0) return (
							<ButtonGroup size="small" aria-label="small outlined button group" key={food['foodId']}>
								<Typography component={RouterLink} to={`/foods/${food['foodId']}`} key={food['foodId']}>{food['name']}</Typography>
								<Button onClick={e => {handleDecrease(e, food)}} key={food['foodId']}>-</Button>
								<Button disabled key={food['foodId']}>{food['quantity']}</Button>
								<Button onClick={e => {handleIncrease(e, food)}} key={food['foodId']}>+</Button>
							</ButtonGroup>
						)
						else context.setCart("")
					})
				}}
			</CartContext.Consumer>
		</SwipeableDrawer>
	);
}

export default CartBar;