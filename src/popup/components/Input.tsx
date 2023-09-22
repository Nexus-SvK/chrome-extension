import React, { ChangeEventHandler } from "react";
import "./input.css";

type props = {
	inputName?: string;
	type?: React.HTMLInputTypeAttribute;
	placeholder: string;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
};

export const Input = ({
	inputName,
	type,
	placeholder,
	value,
	onChange,
}: props) => {
	return (
		<div>
			{inputName && <h4>{inputName}</h4>}
			<input
				className="styled_input"
				inputMode="text"
				type={type}
				placeholder={placeholder}
				name={inputName?.toLowerCase()}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};
