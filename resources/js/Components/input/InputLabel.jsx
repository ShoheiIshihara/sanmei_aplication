import React from 'react';

export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-ebb-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
