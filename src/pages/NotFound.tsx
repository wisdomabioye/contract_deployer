import React from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

const spinnerStyle: React.CSSProperties = {
	position: "absolute",
	transform: "translate(50%, -50%)",
	top: "50%",
	right: "50%",
	textAlign: "center"
}

const NotFound = () => {
	const notFound = "/not-found.png";

	return (
		<div style={spinnerStyle}>
			<Image src={notFound} width={45} alt="not_found" />
			<p className="py-3">We couldn"t find the requested resources</p>
			<Button as={Link as any} to="/">Go home</Button>
		</div>
	)
}

export default NotFound;