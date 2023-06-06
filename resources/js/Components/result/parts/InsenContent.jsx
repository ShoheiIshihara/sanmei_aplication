
import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';

import ResultTableTd from '@/Components/ResultTableTd';


export default function InsenContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const insenStyleTd="w-[50px] text-left h-9 ";
    const zoukanFlgTd ="text-right w-3 p-0";

    return(
       <div className='mx-auto w-11/12 h-[340px]'>
                <div className="card  shadow-md  bg-white w-full h-full ">
                    <div className="card-body max-w-sm mx-auto">
                        <h2 className="card-title mx-auto">陰占</h2>
                        <table  className='text-2xl'>
                            <tbody>
                                {/* 左端に天中殺　右端に年干支天中殺　蔵干フラグで'>'の位置を調整 */}
                                <tr className="">
                                    <ResultTableTd />
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nikkan } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.gekkan } tablestyle={`${insenStyleTd}`}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nenkan } tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd />
                                    <ResultTableTd />

                                </tr>
                                <tr className="">
                                    <ResultTableTd value={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) } tablestyle="w-[50px]"/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nisshi } tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.gesshi } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nenshi } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd tablestyle="w-0"/>
                                    <ResultTableTd value={result.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(0,1) }tablestyle="w-0"/>

                                </tr>
                                <tr className="">
                                    <ResultTableTd value={result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                    <ResultTableTd value={result.insen.nikkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nikkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd value={result.insen.gekkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukan1 }tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd value={result.insen.nenkanshizoukanflg == 0?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nenkanshizoukan1 } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.kanshi_detail.nenkanshi_detail.tenchusatsu_detail[0].tenchusatsu.substr(1,1) }/>
                                </tr>
                                <tr className="">
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nikkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nikkanshizoukan2 } tablestyle={`${insenStyleTd}  `}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukan2 } tablestyle={`${insenStyleTd}  `} />
                                    <ResultTableTd value={result.insen.nenkanshizoukanflg == 1?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nenkanshizoukan2 } tablestyle={`${insenStyleTd} `}/>
                                    <ResultTableTd />
                                    <ResultTableTd />
                                </tr>
                                <tr>
                                    <ResultTableTd />
                                    <ResultTableTd value={result.insen.nikkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nikkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                    <ResultTableTd value={result.insen.gekkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.gekkanshizoukan3 } tablestyle={`${insenStyleTd}  `} />
                                    <ResultTableTd value={result.insen.nenkanshizoukanflg == 2?  ">": ""} tablestyle={zoukanFlgTd}/>
                                    <ResultTableTd value={result.insen.nenkanshizoukan3 } tablestyle={`${insenStyleTd} `} />
                                    <ResultTableTd />
                                    <ResultTableTd />
                                </tr>
                                </tbody>
                        </table>
                        <div className='flex justify-center w-full gap-2 mb-2'>
                            <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.nikkanshi_modal.showModal()}>日干支</button>
                            <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.gekkanshi_modal.showModal()}>月干支</button>
                            <button className="btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.nenkanshi_modal.showModal()}>年干支</button>
                        </div>
                    </div>
                   
                </div>
     
            {/* モーダル内容 */}
            <dialog id="nikkanshi_modal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                    <button htmlFor="nikkanshi_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    {/* 日干支 */}
                    <div className='text-black'>
                        <h3>日干支</h3>
                        <p>
                            {result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi}
                        </p>
                        <p>
                            {result.kanshi_detail.nikkanshi_detail.kanshi_detail.nickname}
                        </p>
                        <p>
                            {result.kanshi_detail.nikkanshi_detail.kanshi_detail.kanshi_detail}
                        </p>
                        <p>
                            {result.kanshi_detail.nikkanshi_detail.kanshi_detail.explanation}
                        </p>
                        {result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>●{result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.gou_detail[0].gou_detail}</dd>
                               
                                <p className={`mx-4 text-xs border-y-4 p-4 rounded `}>
                                    業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある人が多い。また、業の現象が現れると運勢が上がる。<br />
                                    日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                    年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                </p>
                            </dl>)
                        :""}
                        {result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.nikkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                            </dl>)
                        :""}
                    </div>
                </form>
            </dialog>

            <dialog id="gekkanshi_modal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                    <button htmlFor="gekkanshi_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    {/* 日干支 */}
                    <div className='text-black'>
                        <h3>月干支</h3>
                        <p>
                            {result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi}
                        </p>
                        <p>
                            {result.kanshi_detail.gekkanshi_detail.kanshi_detail.nickname}
                        </p>
                        <p>
                            {result.kanshi_detail.gekkanshi_detail.kanshi_detail.kanshi_detail}
                        </p>
                        <p>
                            {result.kanshi_detail.gekkanshi_detail.kanshi_detail.explanation}
                        </p>
                        {result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>●{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.gou_detail[0].gou_detail}</dd>
                               
                                <p className={`mx-4 text-xs border-y-4 p-4 rounded `}>
                                    業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある人が多い。また、業の現象が現れると運勢が上がる。<br />
                                    日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                    年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                </p>
                            </dl>)
                        :""}
                        {result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.gekkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                            </dl>)
                        :""}
                    </div>
                </form>
            </dialog>
            <dialog id="nenkanshi_modal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                    <button htmlFor="nenkanshi_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    {/* 日干支 */}
                    <div className='text-black'>
                        <h3>月干支</h3>
                        <p>
                            {result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi}
                        </p>
                        <p>
                            {result.kanshi_detail.nenkanshi_detail.kanshi_detail.nickname}
                        </p>
                        <p>
                            {result.kanshi_detail.nenkanshi_detail.kanshi_detail.kanshi_detail}
                        </p>
                        <p>
                            {result.kanshi_detail.nenkanshi_detail.kanshi_detail.explanation}
                        </p>
                        {result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>●{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.gou_detail[0].gou_detail}</dd>
                               
                                <p className={`mx-4 text-xs border-y-4 p-4 rounded `}>
                                    業を持っていると目に見えないモノを直感的に見抜く力が出てくる。霊力がある人が多い。また、業の現象が現れると運勢が上がる。<br />
                                    日干支に業を持っていると影響が強くすぐに現象が現れる。月干支は年を取るにつれてじわじわ出てくる。<br />
                                    年干支に業を持っている場合、影響はあまり出ないが、周囲の陽転者の影響を受け発現することがある。
                                </p>
                            </dl>)
                        :""}
                        {result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi_id !=0 ?
                            (<dl className="mx-3 my-3 p-2 bg-gray-100 text-xs rounded">
                                <dt>{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_kanshi}</dt>
                                <dd className="ml-2 mt-1">{result.kanshi_detail.nenkanshi_detail.ijou_detail[0].ijou_detail}</dd>
                            </dl>)
                        :""}
                    </div>
                </form>
            </dialog>
        </div>
    )
}