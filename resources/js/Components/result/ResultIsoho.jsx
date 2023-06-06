import React from 'react';
import { useEffect,useState } from 'react';

import ResultIsouTableContent from './parts/ResultIsouTableContent';

export default function ResultIsoho() {


    return(
        <div className="h-3/4  border rounded-xl mx-2 sm:m-5 sm:mt-1 bg-white px-10 py-3 overflow-y-scroll " >

            <ResultIsouTableContent  isouTiming="taiun" />


        </div>
    );
}
