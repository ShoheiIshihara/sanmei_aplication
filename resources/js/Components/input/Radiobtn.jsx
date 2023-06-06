import React from 'react';

export default function Radiobtn({ name, value, id, label, checked, inputStyle,labelStyle, handleChange }) {
    // console.log(checked)
    return (
    <>
    <div>
        <input
            type="radio"
            name={name}
            value={value}
            id={id}
            className={`rounded border-gray-300 text-sea-pink-600 shadow-sm focus:ring-red-500 ${inputStyle}`}
            onChange={handleChange}
            defaultChecked={checked}
        />
            <label
                htmlFor={id}
                className={`font-medium text-sm text-ebb-700 ${labelStyle}`}>
                    {label}
            </label>
    </div>
    </>
    );
}
