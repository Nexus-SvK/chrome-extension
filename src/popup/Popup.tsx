import React from "react";
import init from "../pageInit";
import "./Popup.css";

export const Popup = () => {
	const btn = () => console.log("Signed out");

	return (
		<div className="popup_header">
			<img
				src="https://buffer.com/library/content/images/2022/03/skitch--7-.png"
				alt="Profile picture"
				width={"100vh"}
			/>
			<h3>Bibiana Frantisek</h3>
			<button onClick={btn}>Sign out</button>
		</div>
	);
};

init(<Popup />);
