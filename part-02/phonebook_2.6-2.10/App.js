import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);

	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterValue, setFilterValue] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handlePhoneChange = (event) => {
		setNewPhone(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilterValue(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();

		const nameToAdd = {
			name: newName,
			phone: newPhone,
		};

		const alreadyRecorded = persons.filter((person) => person.name === newName);

		alreadyRecorded.length === 0
			? setPersons(persons.concat(nameToAdd))
			: alert(`${newName} is already added to phonebook`);

		setNewName("");
		setNewPhone("");
	};

	const nameToShow = filterValue
		? persons.filter((person) =>
				person.name
					.toLocaleLowerCase()
					.includes(filterValue.toLocaleLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<p>
				filter shown with{" "}
				<input value={filterValue} onChange={handleFilterChange} />
			</p>
			<form>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
					phone: <input value={newPhone} onChange={handlePhoneChange} />
				</div>
				<div>
					<button type='submit' onClick={addName}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{nameToShow.map((person) => (
				<p>
					{person.name} {person.phone}
				</p>
			))}
		</div>
	);
};

export default App;
