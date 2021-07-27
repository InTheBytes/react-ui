import React from 'react';
import {Typography, ButtonGroup, Button, Table, TableCell, TableRow, TableBody} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import CartContext from "./CartContext";

function Cart(props) {

    return (
        <CartContext.Consumer>
			{(context) => {

				let handleIncrease = (food) => {
					let newCart = Object.assign({}, context.cart);

					newCart[food['foodId']].quantity++;

					context.setCart(newCart)
				}

				let handleDecrease = (food) => {
					let newCart = Object.assign({}, context.cart);

					let quantity = --newCart[food['foodId']].quantity;
					if (quantity <= 0) {
						delete newCart[food['foodId']];
					}
					context.setCart(newCart)
				}

				return (
					<Table>
						<TableBody>
							{Object.entries(context.cart).map(([foodId, food]) => (
								<TableRow>
									<TableCell>
										<Typography 
											component={RouterLink} 
											to={`/foods/${foodId}`} 
											color='textPrimary' 
											variant='body1'>
											{food['name']}
										</Typography>
									</TableCell>
									<TableCell>
										<ButtonGroup 
											size="small" 
											aria-label="small outlined button group" 
											key={foodId} alignItems="left"
										>
											<Button onClick={() => handleDecrease(food)}>-</Button>
											<Button disabled>{food['quantity']}</Button>
											<Button onClick={() => handleIncrease(food)}>+</Button>
										</ButtonGroup>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)
			}}
		</CartContext.Consumer>
    )
}

export default Cart;