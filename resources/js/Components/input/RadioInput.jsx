import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function RadioInput(
    { type = 'radio', id, name, value, className, autoComplete, required, isFocused,handleChange},
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                className={
                    `border-gray-300 text-sea-pink-700 focus:border-red-300 focus:ring-red-300 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
