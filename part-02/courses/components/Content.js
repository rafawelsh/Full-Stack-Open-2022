import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
	if (!parts) return null;

	return (
		<>
			{parts.map((section, idx) => {
				return (
					<Part key={idx} part={section.name} exercise={section.exercises} />
				);
			})}
		</>
	);
};

export default Content;
