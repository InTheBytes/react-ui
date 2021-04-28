import React from 'react';
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import './Filters.css';

function Filters(props) {

	const [sort, setSort] = React.useState('low');
	const [filter, setFilter] = React.useState('low');

	const handleSort = (event) => {
		setSort(event.target.value);
		alert("call to api");
	};

	const handleFilter = (event) => {
		setFilter(event.target.value);
		alert("call to api");
	};

	return (
		<div id="optionPanel">
			<FormControl component="fieldset" id="sortPanel">
				<FormLabel component="legend">Sort By</FormLabel>
				<RadioGroup aria-label="sort" name="sort" value={sort} onChange={handleSort}>
					<FormControlLabel value="low" control={<Radio />} label="Low to High" />
					<FormControlLabel value="high" control={<Radio />} label="High to Low" />
					<FormControlLabel value="star" control={<Radio />} label="Star Rating" />
				</RadioGroup>
			</FormControl>
			<FormControl component="fieldset" id="filterPanel">
				<FormLabel component="legend">Filter By</FormLabel>
				<RadioGroup aria-label="filter" name="priceFilter" value={filter} onChange={handleFilter}>
					<FormControlLabel value="low" control={<Radio />} label="$" />
					<FormControlLabel value="high" control={<Radio />} label="$$$" />
				</RadioGroup>
			</FormControl>
		</div>
	);
}

export default Filters;