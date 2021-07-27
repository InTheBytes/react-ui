import React from 'react';
import {SwipeableDrawer} from '@material-ui/core';
import Cart from './Cart';
import './CartBar.css';

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
			<Cart />
		</SwipeableDrawer>
	);
}

export default CartBar;