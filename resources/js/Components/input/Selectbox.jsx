import React from 'react';

export default function Selectbox({ name, MaxValue, MinValue, time, editValue, handleChange,}) {
    const items = [];

        for (let i = MinValue; i <= MaxValue; i++) {
                items.push({value:i})
        };
        // console.log(items)
    return (
        <>
        <select
            name={name}
            className="rounded border-gray-300 text-ebb-600 shadow-sm focus:ring-sea-pink-500  focus:border-red-300 "
            onChange={handleChange}
            defaultValue={editValue}
        >
              {items.map((val,key) =>
                // console.log(val.checked)
                    <option value={val.value} name={name} key={key} >{val.value} </option>
              )

            }

            {/* {console.log(items)} */}

        </select><span className="font-medium text-sm text-gray-700">{time}</span>
        </>
    );
}
