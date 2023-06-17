import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className=" flex flex-col sm:justify-center items-center pt-6 sm:pt-0 h-screen  bg-ebb-50">
            <div>
                <Link href="/">
                <img src={'/images/logo-color.png'} />

                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
