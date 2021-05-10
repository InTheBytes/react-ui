import React from 'react';

import "./ViewResults.css";
import {Pagination} from "@material-ui/lab";

function ViewResults(props) {

	const handleChange = (event, value) => {
		props.setPage(value);
	};

	function PageThrough(pageProps) {
		return (
			<Pagination className="resultPagination" page={props.results['number']+1} count={props.results['totalPages']} onChange={handleChange} />
		);
	}

	switch (props.resultType) {
		case "food":
			return (<>
				<ul className="resultList">
					{props.results.content?.map(data => (
						<li id={`food-${data['foodId']}`}>
							<a href={`foods/${data['foodId']}`}>
								<span className="resultImage"><img src={"./logo.png"} alt={`${data['name']}`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">${data['price']}</span>
							</a>
						</li>
					))}
				</ul>
				<PageThrough />
			</>);
		case "restaurant":
			return (<>
				<ul className="resultList">
					{props.results.content?.map(data => (
						<li id={`food-${data['restaurantId']}`}>
							<a href={`restaurants/${data['restaurantId']}`}>
								<span className="resultImage"><img src={"./logo.png"} alt={`${data['name']} restaurant`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">[More Info]</span>
							</a>
						</li>
					))}
				</ul>
				<PageThrough />
			</>);
		default:
			return ("");
	}
}

export default ViewResults;