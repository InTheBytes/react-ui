import React, {useEffect, useState} from 'react';
import {TextField, Tabs, Tab} from '@material-ui/core';
import Axios from "axios";

import './Search.css';

import Filters from "./Filters";
import ViewResults from "./ViewResults";

function Search(props) {

	const [tab, setTab] = useState(0);
	const [results, setResults] = useState([]);

	const fetchProducts = async () => {
		const { data } = await Axios.get(
			"https://607dad8d184368001769e45e.mockapi.io/foodlist"
		);
		const results = data;
		setResults(results);
		console.log(results);
	};

	useEffect(() => {
		fetchProducts()
			.then()
			.catch(e => {});
	}, []);

	const handleChange = (event, newTab) => {
		setTab(newTab);
	};

	return (<>
		<Filters />
		<div className="pageContent">
			<TextField id="searchBox" label="Search" />
			<Tabs value={tab} onChange={handleChange} aria-label="food/restaurant tabs">
				<Tab label="Food" id={`results-tab-${0}`} aria-controls={`results-tabpanel-${0}`} />
				<Tab label="Restaurant" id={`results-tab-${1}`} aria-controls={`results-tabpanel-${1}`} />
			</Tabs>
			<div
				role="tabpanel"
				hidden={tab !== 0}
				id={`results-tabpanel-${0}`}
				className="resultTab"
				aria-labelledby={`results-tab-${0}`}
			>
				<ViewResults resultType="food" list={results} />
			</div>
			<div
				role="tabpanel"
				hidden={tab !== 1}
				id={`results-tabpanel-${1}`}
				aria-labelledby={`results-tab-${1}`}
			>
				<ViewResults resultType="restaurant" list={results} />
			</div>
		</div>
	</>);
}

export default Search;