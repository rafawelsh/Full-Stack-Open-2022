import React, { useState, useEffect } from "react";
import ContactServices from "./services/contacts";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterValue, setFilterValue] = useState("");

	useEffect(() => {
		ContactServices.getAll().then((initalContacts) =>
			setPersons(initalContacts)
		);
	}, []);

	const addName = (event) => {
		event.preventDefault();

		const nameToAdd = {
			name: newName,
			phone: newPhone,
		};

		const alreadyRecorded = persons.filter((person) => person.name === newName);

		if (alreadyRecorded.length === 0) {
			ContactServices.addContact(nameToAdd).then((newContact) => {
				setPersons(persons.concat(newContact));
			});
		} else {
			const confirmation = window.confirm(
				`${newName} is already added to phonebook`
			);

			if (confirmation) {
				const personToEdit = persons[newName];
				console.log(personToEdit);
				console.log(newName);
				ContactServices.editContact(nameToAdd).then(
					(personToEdit, editedContact) => {
						setPersons(
							persons.map((person) =>
								person.id !== editedContact.id ? person : editedContact
							)
						);
					}
				);
			}
		}

		setNewName("");
		setNewPhone("");
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handlePhoneChange = (event) => {
		setNewPhone(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilterValue(event.target.value);
	};

	const handleDeletion = ({ name, id }) => {
		const confirmation = window.confirm(
			`Are you sure you want to delete ${name}?`
		);

		if (confirmation) {
			ContactServices.deleteContact(id).then((deletedPerson) => {
				setPersons(persons.filter((p) => p.id !== id));
			});
		}
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
					{person.name} {person.phone}{" "}
					<button onClick={() => handleDeletion(person)}>delete</button>
				</p>
			))}
		</div>
	);
};

export default App;
