import React, { ChangeEventHandler, FocusEventHandler } from "react";
import "./_text-field.scss";

type props = {
    inputName?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>
};

export const Input = ({
    inputName,
    type,
    placeholder,
    value,
    onChange,
    onBlur
}: props) => {
    return (
        // <div>
        //     {inputName && <h4>{inputName}</h4>}
        //     <input
        //         className="styled_input"
        //         inputMode="text"
        //         type={type}
        //         placeholder={placeholder}
        //         name={inputName?.toLowerCase()}
        //         value={value}
        //         onChange={onChange}
        //     />
        // </div>

        // <div className="form__group field">
        //     <input type={type} className="form__field" placeholder={placeholder} name={inputName} value={value} onChange={onChange} />
        //     {inputName && <label htmlFor={inputName} className="form__label">{inputName}</label>}
        // </div>

        <div className="inputBox">
            <input type={type ?? "text"} name={inputName} onBlur={onBlur} onChange={onChange} value={value} required />
            <span>{inputName}</span>
        </div>
    );
};
