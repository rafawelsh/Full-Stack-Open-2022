import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesView from "./components/CountriesView";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [countryFilter, setCountryFilter] = useState("");
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		axios
			.get("https://restcountries.com/v3.1/all")
			.then((response) => response.data)
			.then((data) => setCountries(data))

			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const listOfCountries = countries.filter((country) => {
			const countryName = country.name["common"].toLowerCase();
			return countryName.includes(countryFilter.toLowerCase());
		});

		setFilteredCountries(listOfCountries);
	}, [countries, countryFilter]);

	const handleCountryFilter = (event) => {
		setCountryFilter(event.target.value);
	};

	return (
		<div>
			<p>
				find countries
				<input value={countryFilter} onChange={handleCountryFilter} />
			</p>
			{countryFilter ? (
				<CountriesView
					countries={filteredCountries}
					setFilteredCountries={setFilteredCountries}
				/>
			) : (
				<p>Search for a country</p>
			)}
		</div>
	);
};

export default App;
