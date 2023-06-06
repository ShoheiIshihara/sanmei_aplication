import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-ebb-900 border border-transparent rounded-md font-semibold text-xs text-ebb-50 uppercase tracking-widest hover:bg-ebb-700 focus:bg-ebb-700 active:bg-ebb-900 focus:outline-none focus:ring-2 focus:ring-sea-pink-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
