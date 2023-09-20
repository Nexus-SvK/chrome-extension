import React from "react";
import init from "../pageInit";
import "./popup.css";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Popup = () => {
	const btn = () => {
		chrome.notifications.create(v4(), {
			// contextMessage: "Hello There",
			iconUrl: "brain.png",
			message: "This is message",
			type: "basic",
			title: "Hello There",
		});
	};
	return (
		<div className="popup_header">
			{/* <img
				src="https://buffer.com/library/content/images/2022/03/skitch--7-.png"
				style={{ borderRadius: "50vh" }}
				alt="Profile picture"
				width={"100vh"}
			/>
			<h3>Bibiana Frantisek</h3>
			<button onClick={btn}>Sign out</button> */}
			<div className="tab_navigation">
				<FontAwesomeIcon icon={faBars} style={{ height: "4.5vh" }} />
			</div>
		</div>
	);
};

init(<Popup />);
