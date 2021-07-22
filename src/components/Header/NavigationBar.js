import React from 'react';
import "./NavigationBar.css";
import {AppBar, IconButton, Toolbar, Menu, MenuItem, Icon} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';
import AuthContext from "../Authentication/AuthContext";

function NavigationBar(props) {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="fixed">
			<Toolbar>
				<IconButton edge="start" onClick={() => {props.setDrawer(true)}} id="navMenu" color="inherit" aria-label="menu">
					<Icon>menu</Icon>
				</IconButton>
				<IconButton
					edge="start"
					className="flushLeft"
					color="inherit"
					aria-label="cart"
					aria-controls="menu-cart"
					aria-haspopup="true"
					onClick={() => {props.setCartDrawer(true)}}
				>
					<Icon>shopping_cart</Icon>
				</IconButton>
				<IconButton
					edge="start"
					id="navLogin"
					color="inherit"
					aria-label="account"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
				>
					<Icon>person</Icon>
				</IconButton>
				<div>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						keepMounted
						getContentAnchorEl={null}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						open={open}
						onClose={handleClose}
					>
						<AuthContext.Consumer>
							{({auth, setAuth}) => {
								if (auth?.length > 0) {
									return (<>
										<MenuItem component={RouterLink} onClick={handleClose} to="/profile" key="profile">View Profile</MenuItem>,
										<MenuItem component={RouterLink} onClick={handleClose} to="/orders" key="orders">Order History</MenuItem>,
										<MenuItem component={RouterLink} onClick={handleClose} to="/logout" key="logout">Logout</MenuItem>
										</>)
								} else {
									return (<>
										<MenuItem component={RouterLink} onClick={handleClose} to="/login"  key="login">Login</MenuItem>
										<MenuItem component={RouterLink} onClick={handleClose} to="/register" key="signup">Sign Up</MenuItem>
									</>)
								}
							}}
						</AuthContext.Consumer>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default NavigationBar;