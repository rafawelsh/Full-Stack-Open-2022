import React from "react";
import CountryDetails from "./CountryDetails";

const CountriesView = ({ countries, setFilteredCountries }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	} else if (
		(countries.length > 2 && countries.length < 10) ||
		countries.length === 0
	) {
		return (
			<ul>
				{countries.map((country, i) => (
					<li key={i}>
						{country.name.common}
						<button onClick={() => setFilteredCountries([country])}>
							show
						</button>
					</li>
				))}
			</ul>
		);
	} else {
		return <CountryDetails country={countries[0]} />;
	}
};

export default CountriesView;
