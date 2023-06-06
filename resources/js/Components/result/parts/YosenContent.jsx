
import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';

import ResultTableTd from '@/Components/ResultTableTd';


export default function YosenContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const yousenStyleTd="px-3 py-1 text-center text-4xl tracking-wider text-center align-middle";
    
    return(
        <div className='mx-auto w-11/12  h-[340px]'>
            <div className="card  shadow-md  bg-white h-full w-full ">
                    <div className="card-body   mx-auto  ">
                        <h2 className="card-title mx-auto">陽占</h2>
                        <table className='mt-[20px]'>
                            <tbody>
                                <tr className="border-b">
                                    <ResultTableTd value={result.yousen.bansei } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.north } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.first } tablestyle={`${yousenStyleTd}`}/>

                                </tr>
                                <tr className="border-b">
                                    <ResultTableTd value={result.yousen.west } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.center } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.east } tablestyle={`${yousenStyleTd}`}/>

                                </tr>
                                <tr>
                                    <ResultTableTd value={result.yousen.last } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.south } tablestyle={`${yousenStyleTd} border-r`}/>
                                    <ResultTableTd value={result.yousen.middle } tablestyle={`${yousenStyleTd}`}/>
                                </tr>
                            </tbody>
                        </table>
                                 
                    </div>
                </div>
        </div>
    )
}