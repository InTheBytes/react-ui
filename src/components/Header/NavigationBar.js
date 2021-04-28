import React from 'react';
import "./NavigationBar.css";
import {AppBar, IconButton, Toolbar, Menu, MenuItem, Icon} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';

function NavigationBar(props) {
	const [auth, setAuth] = React.useState(false);
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
					id="navLogin"
					color="inherit"
					aria-label="login"
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
						{auth ? (
							<MenuItem component={RouterLink} onClick={handleClose} to="/logout">Logout</MenuItem>
						) : (<>
							<MenuItem component={RouterLink} onClick={handleClose} to="/login">Login</MenuItem>
							<MenuItem component={RouterLink} onClick={handleClose} to="/register">Sign Up</MenuItem>
						</>)}
						</Menu>
					</div>
			</Toolbar>
		</AppBar>
	)
}

export default NavigationBar;