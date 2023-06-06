import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';

import InsenContent from './parts/InsenContent';
import YosenContent from './parts/YosenContent';
import KoudouContent from './parts/KoudouContent';
import IsouContent from './parts/IsouContent';
import KizuhoContent from './parts/KizuhoContent';
import EnergyContent from './parts/EnergyContent';
import HachimonContent from './parts/HachimonContent';
import TenchusatsuContent from './parts/TenchusatsuContent';

export default function ResultSumnei() {



    return(
            <div className="" >
                <hr className="mt-4 border-sea-pink-400" />
                <h1 className="text-2xl py-2 text-center border-sea-pink-400 w-full border-l-8 border-r-8 sm:border-r-0 sm:pl-2 sm:text-left font-medium ">算命学　鑑定結果</h1>
                    <hr className="mb-2 border-sea-pink-400" />
                {/* insen yousen table */}
                <div className="grid gap-4 gap-x-0 mb-12 sm:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 text-ebb-700">
                     {/* カードコンポーネント及びモーダル  */}
                    <InsenContent />
                    <YosenContent />
                    <KoudouContent />
                    <IsouContent />
                    <KizuhoContent />
                    <HachimonContent />
                    <EnergyContent />
                    <TenchusatsuContent />                    
                </div>


        </div>);
}
