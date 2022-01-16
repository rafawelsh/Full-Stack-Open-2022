import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const addContact = (newContact) => {
	const request = axios.post(baseUrl, newContact);
	return request.then((response) => response.data);
};

const editContact = (personToEdit, newObject) => {
	const request = axios.put(`${baseUrl}/${personToEdit.id}`, newObject);
	return request.then((response) => response.data);
};

const deleteContact = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};
export default { getAll, addContact, editContact, deleteContact };
