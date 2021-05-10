import React from 'react';
import { SwipeableDrawer, Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import './SideBar.css';

function SideBar(props) {

	let toggleDrawer = (open) => {
		return () => {
			props.setDrawer(open);
		}
	};

	return (
		<SwipeableDrawer
			anchor={'left'}
			open={props.drawer}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
			role="sidebar"
		>
			<Link
				component={RouterLink}
				to="/"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				Home
			</Link>
			<Link
				component={RouterLink}
				to="/about"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				About Us
			</Link>
			<Link
				component={RouterLink}
				to="/login"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				Join StackLunch
			</Link>
			<Link
				component={RouterLink}
				to="/search"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				Search Our Menu
			</Link>
			<Link
				component={RouterLink}
				to="/contact"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				Contact
			</Link>
		</SwipeableDrawer>
	);
}

export default SideBar;