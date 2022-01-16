import React from "react";

function Header({ name }) {
	console.log("here", name);
	return <h2>{name}</h2>;
}

export default Header;
