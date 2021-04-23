import React, { useState, useEffect } from 'react';
import "./ViewSearch.css";
import Axios from "axios";

function ViewSearch() {
	const [Foods, setFoods] = useState([]);

	const fetchProducts = async () => {
		const { data } = await Axios.get(
			"https://607dad8d184368001769e45e.mockapi.io/foodlist"
		);
		const foods = data;
		setFoods(foods);
		console.log(foods);
	};

	useEffect(() => {
		fetchProducts().then().catch(e => {});
	}, []);

	return (<>
		<aside id="sortPanel">
			<form onChange={event => alert("call to api")}>
				<p>Sort By:</p>
				<input type="radio" id="sortPriceLow" name="sort" value="low"/>
				<label htmlFor="sortPriceLow">Low to High</label>
				<input type="radio" id="sortPriceHigh" name="sort" value="high"/>
				<label htmlFor="sortPriceHigh">High to Low</label>
				<input type="radio" id="sortStar" name="sort" value="star"/>
				<label htmlFor="sortStar">Star Rating</label>
			</form>
		</aside>
			<table id="foodList">
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th>Description</th>
				</tr>
				{Foods.map(data => (
					<tr id={data.foodId}>
						<td>{data.name}</td>
						<td>${data.price}</td>
						<td>{data.description}</td>
					</tr>
				))}
			</table>
	</>);
}

export default ViewSearch;