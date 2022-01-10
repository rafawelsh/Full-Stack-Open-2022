import React, { useState } from "react";

const Title = ({ text }) => {
	return <h2>{text}</h2>;
};

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const CountDisplay = ({ text, counter }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{counter}</td>
		</tr>
	);
};

const Statistics = ({ good, bad, neutral }) => {
	const total = good + neutral + bad;

	if (total === 0) return <p>No feedback</p>;

	return (
		<div>
			<table>
				<tbody>
					<CountDisplay text='good' counter={good} />
					<CountDisplay text='neutral' counter={neutral} />
					<CountDisplay text='bad' counter={bad} />
					<CountDisplay text='all' counter={good + neutral + bad} />
					<CountDisplay text='average' counter={(good + bad * -1) / total} />
					<CountDisplay text='positive' counter={`${(good / total) * 100}%`} />
				</tbody>
			</table>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	return (
		<div>
			<Title text='give feedback' />
			<Button handleClick={handleGood} text='good' />
			<Button handleClick={handleNeutral} text='neutral' />
			<Button handleClick={handleBad} text='bad' />

			<Title text='statistics' />
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	);
};

export default App;
