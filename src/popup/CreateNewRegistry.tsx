import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Input } from "./components/Input";

type props = {
	opened: boolean;
	onClose: () => void;
};

export const CreateNewRegistry = ({ opened, onClose }: props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [date, setDate] = useState("");
	return (
		<div className={`create-menu ${opened ? "open" : ""}`}>
			<FontAwesomeIcon
				icon={faXmarkCircle}
				style={{
					position: "absolute",
					right: 17,
					top: "6vh",
					height: "5vh",
				}}
				onClick={onClose}
			/>
			<h3>New Registry</h3>
			<Input
				inputName="Username"
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input
				inputName="Password"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Input
				inputName="Expiration date"
				placeholder="Select date"
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
		</div>
	);
};
