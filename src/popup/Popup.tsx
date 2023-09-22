import React, { useState } from "react";
import init from "../pageInit";
import "./popup.css";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faXmarkCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CreateNewRegistry } from "./CreateNewRegistry";

const Popup = () => {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [createNewRegisty, setCreateNewRegistry] = useState(false);

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
		<div style={{ backgroundColor: "blue", paddingInline: 10 }}>
			{/* <img
				src="https://buffer.com/library/content/images/2022/03/skitch--7-.png"
				style={{ borderRadius: "50vh" }}
				alt="Profile picture"
				width={"100vh"}
			/>
			<h3>Bibiana Frantisek</h3>
			<button onClick={btn}>Sign out</button> */}
			<div className="tab_navigation">
				<FontAwesomeIcon
					icon={faBars}
					style={{ height: "4.5vh" }}
					onClick={() => setOpenMenu(true)}
				/>
				<FontAwesomeIcon
					icon={faPlus}
					style={{ height: "4.5vh" }}
					onClick={() => setCreateNewRegistry(true)}
				/>
				<div className={`menu ${openMenu ? "open" : ""}`}>
					<FontAwesomeIcon
						icon={faXmarkCircle}
						style={{
							position: "absolute",
							height: "5vh",
							right: 0,
						}}
						onClick={() => setOpenMenu(false)}
					/>
					<h3>Settings</h3>
				</div>
				<CreateNewRegistry
					opened={createNewRegisty}
					onClose={() => setCreateNewRegistry(false)}
				/>
			</div>
		</div>
	);
};

init(<Popup />);
