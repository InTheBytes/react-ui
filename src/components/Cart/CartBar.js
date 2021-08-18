import React from 'react';
import {Button, makeStyles, SwipeableDrawer} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Cart from './Cart';
import './CartBar.css';
import CartContext from './CartContext';

const useStyles = makeStyles((theme) => ({
	checkout_link: {
		position: 'absolute',
		margin: theme.spacing(1, 1, 1),
		bottom: 2,
		width: '95%'
	}
}))

function CartBar(props) {

	let toggleDrawer = (open) => {
		return () => {
			props.setDrawer(open);
		}
	};

	const classes = useStyles()

	return (
		<SwipeableDrawer
			anchor={'right'}
			open={props.drawer}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
			role="sidebar"
			className="sideBar"
		>
			<Cart />
			<CartContext.Consumer>
				{(value) => {
					return (Object.entries(value.cart).length > 0) ?
						(<RouterLink to={"/checkout"}>
							<Button 
								className={classes.checkout_link} 
								variant='contained' 
								size='large'
								onClick={toggleDrawer(false)}>
								Checkout
							</Button>
						</RouterLink>) : <></>
				}}
			</CartContext.Consumer>
		</SwipeableDrawer>
	);
}

export default CartBar;