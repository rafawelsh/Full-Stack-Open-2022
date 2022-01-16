import React, { useEffect, useState } from "react";
import axios from "axios";

function CountryDetails({ country }) {
	const [languages, setLanguages] = useState([]);
	const [weatherInfo, setWeather] = useState([]);

	const api_key = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
			)
			.then((response) => response.data)
			.then((data) => setWeather(data));
	}, [api_key, country.capital]);

	useEffect(() => {
		setLanguages(Object.values(country.languages) || {});
	}, [country.languages]);

	const { main, weather, wind } = weatherInfo;
	console.log(weatherInfo);
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>

			<h3>languges</h3>
			<ul>
				{languages.map((lang) => (
					<li>{lang}</li>
				))}
			</ul>

			<img src={country.flags.png} alt='Country flag'></img>

			<h3>Weather in {country.capital}</h3>
			{main && weather && wind && (
				<>
					<p>
						<b>weather: </b> {weatherInfo.main.temp}
					</p>
					<img
						src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
						alt='weather icon from API'
					/>
					<p>
						<b>wind: </b>
						{wind.speed} km
					</p>
				</>
			)}
		</div>
	);
}

export default CountryDetails;
