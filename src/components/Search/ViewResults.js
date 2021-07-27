import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

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
						<li id={`food-${data['foodId']}`} key={data['foodId']}>
							<RouterLink
								to={`foods/${data['foodId']}`}
								className="Nav__link"
							>
								<span className="resultImage"><img src={"./logo.png"} alt={`${data['name']}`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">${data['price']}</span>
							</RouterLink>
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
							<RouterLink
								to={`restaurants/${data['restaurantId']}`}
								className="Nav__link"
							>
								<span className="resultImage"><img src={"./logo.png"} alt={`${data['name']} restaurant`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">[More Info]</span>
							</RouterLink>
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