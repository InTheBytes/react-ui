import React, {useEffect, useState} from 'react';
import {TextField, Tabs, Tab, Grid} from '@material-ui/core';
import Axios from "axios";

import './Search.css';

import Filters from "./Filters";
import ViewResults from "./ViewResults";

function Search(props) {

	const [tab, setTab] = useState(0);
	const [input, setInput] = useState("");
	const [sort, setSort] = useState("low");
	const [filter, setFilter] = useState([]);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	let searchTimeout = 0;

	const handleSort = (sortBy) => {
		setSort(sortBy);
	}

	const handleFilter = (filterBy) => {
		setFilter(filterBy);
	}

	const handleChange = (event, newTab) => {
		setTab(newTab);
	};

	const updateSearch = (event) => {
		if (searchTimeout) clearTimeout(searchTimeout);

		searchTimeout = setTimeout(() => {
			setInput(event.target.value);
		}, 1000);
	}

	useEffect(() => {

		const fetchFood = async () => {
			let url = "http://localhost:8082/search/";
			url += (tab === 0) ? "food" : "restaurant";
			url += "?query=" + input;
			url += (sort.length > 0) ? "&sort="+ sort : "";
			url += (filter.length > 0) ? "&filter="+ filter.join() : "";
			url += (page) ? "&page="+ page : "";

			const { data } = await Axios.get(url);

			setResults(data);
		};


		fetchFood()
			.then()
			.catch(e => {});
	}, [tab, input, sort, filter, page]);

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} md={2}>
				<Filters sortBy={handleSort} filterBy={handleFilter} />
			</Grid>
			<Grid item xs ={12} md={10}>
				<div className="pageContent">
					<TextField id="searchBox" label="Search" input={input} onChange={updateSearch} />
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
						aria-label="food results tab"
					>
						<ViewResults resultType={(tab === 0) ? "food" : "restaurant"} results={results} setPage={setPage} />
					</div>
					<div
						role="tabpanel"
						hidden={tab !== 1}
						id={`results-tabpanel-${1}`}
						aria-labelledby={`results-tab-${1}`}
						aria-label="restaurant results tab"
					>
						<ViewResults resultType="restaurant" results={results} page={page} setPage={setPage} />
					</div>
				</div>
			</Grid>
		</Grid>
	);
}

export default Search;