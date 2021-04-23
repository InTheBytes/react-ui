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
				to="/About"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				About Us
			</Link>
			<Link
				component={RouterLink}
				to="/Page404"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				Join StackLunch
			</Link>
			<Link
				component={RouterLink}
				to="/Page404"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				More Menu Options
			</Link>
			<Link
				component={RouterLink}
				to="/Page404"
				onClick={toggleDrawer(false)}
				className="Nav__link"
			>
				Contact
			</Link>
		</SwipeableDrawer>
	);
}

export default SideBar;