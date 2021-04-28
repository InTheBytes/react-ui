import React from 'react';

import "./ViewResults.css";

function ViewResults(props) {
	switch (props.resultType) {
		case "food":
			return (
				<ul className="resultList">
					{props.list.map(data => (
						<li id={`food-${data['foodId']}`}>
							<a href={`foods/${data['foodId']}`}>
								<span className="resultImage"><img src={"./logo.png"} alt={`food picture of ${data['name']}`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">${data['price']}</span>
							</a>
						</li>
					))}
				</ul>
			);
		case "restaurant":
			return (
				<ul className="resultList">
					{props.list.map(data => (
						<li id={`food-${data['restaurantId']}`}>
							<a href={`restaurants/${data['restaurantId']}`}>
								<span className="resultImage"><img src={"./logo.png"} alt={`restaurant of ${data['name']}`} width="30px" /></span>
								<span className="resultName">{data['name']}</span>
								<span className="resultDetail">[More Info]</span>
							</a>
						</li>
					))}
				</ul>
			);
		default:
			return ("");
	}
}

export default ViewResults;