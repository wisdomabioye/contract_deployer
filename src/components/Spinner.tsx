import React from "react";
import { Spinner } from "react-bootstrap";
import { useAtom } from "jotai";
import { foreVariant } from "store/theme";

const spinnerStyle: React.CSSProperties = {
	position: "absolute",
	transform: "translate(50%, -50%)",
	top: "50%",
	right: "50%"
}

export const DefaultSpinner = () => {
	const [text] = useAtom(foreVariant);
	return (
		<div style={spinnerStyle}>
			<Spinner animation="border" variant={text}>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	)
}


export default DefaultSpinner;