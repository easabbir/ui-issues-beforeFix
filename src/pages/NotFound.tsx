import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/");
	};

	return (
		<div>
			<h1>404</h1>
			<p>Sorry, the page you visited does not exist.</p>
			<button type="button" onClick={handleNavigate}>
				Back to Home
			</button>
		</div>
	);
};

export default NotFound;
