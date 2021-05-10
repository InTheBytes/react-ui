import React from 'react';
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox} from '@material-ui/core';

import './Filters.css';

function Filters(props) {

	const [sort, setSort] = React.useState('low');
	const [filter, setFilter] = React.useState([]);

	const handleSort = (event) => {
		setSort(event.target.value);
		props.sortBy(event.target.value);
	};

	const handleFilter = (event) => {
		let newFilter = filter;

		let filters = [
			["low", "high"],
			["star1", "star2", "star3", "star4", "star5"]
		];
		for (const group of filters) {
			if (group.includes(event.target.name)) {
				let oldPos = newFilter.indexOf(event.target.name);

				// Toggle off the group
				newFilter = newFilter.filter(el => !group.includes(el));

				if (oldPos === -1) {
					newFilter.push(event.target.name);
				}

				break;
			}
		}

		setFilter(newFilter);
		props.filterBy(newFilter);
	};

	return (
		<div id="optionPanel">
			<FormControl component="fieldset" id="sortPanel">
				<FormLabel component="legend" className="groupLabel">Sort By</FormLabel>
				<RadioGroup aria-label="sort" name="sort" value={sort} onChange={handleSort}>
					<FormLabel component="legend">Price</FormLabel>
					<FormControlLabel value="low" control={<Radio />} label="Low to High" />
					<FormControlLabel value="high" control={<Radio />} label="High to Low" />
					<FormLabel component="legend">Rating</FormLabel>
					<FormControlLabel value="star" control={<Radio />} label="Star Rating" />
				</RadioGroup>
			</FormControl>
			<FormControl component="fieldset" id="filterPanel">
				<FormLabel component="legend" className="groupLabel">Filter By</FormLabel>
				<FormLabel component="legend">Price</FormLabel>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("low")} onChange={handleFilter} name="low" />}
					className="material-icons"
					label="attach_money"
				/>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("high")} onChange={handleFilter} name="high" />}
					className="material-icons"
					label="attach_moneyattach_moneyattach_money"
				/>
				<FormLabel component="legend">Rating</FormLabel>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("star1")} onChange={handleFilter} name="star1" />}
					className="material-icons"
					label="star_rate"
				/>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("star2")} onChange={handleFilter} name="star2" />}
					className="material-icons"
					label="star_ratestar_rate"
				/>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("star3")} onChange={handleFilter} name="star3" />}
					className="material-icons"
					label="star_ratestar_ratestar_rate"
				/>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("star4")} onChange={handleFilter} name="star4" />}
					className="material-icons"
					label="star_ratestar_ratestar_ratestar_rate"
				/>
				<FormControlLabel
					control={<Checkbox checked={filter.includes("star5")} onChange={handleFilter} name="star5" />}
					className="material-icons"
					label="star_ratestar_ratestar_ratestar_ratestar_rate"
				/>
			</FormControl>
		</div>
	);
}

export default Filters;