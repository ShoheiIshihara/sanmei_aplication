import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";


export default function EnergyContent(){
    const result = useSelector(state => state.result.result.sanmei);


    const energy_th = ['甲','乙','丙','丁','戊','己','庚','辛','壬', '癸','合計'];

    return(
        <div className='mx-auto w-11/12 h-[150px]'>
            <button className="card shadow-md  h-full w-full bg-white hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.energy_modal.showModal()} >
                <div className="card-body  w-full ">
                    <h2 className="card-title mx-auto">エネルギー</h2>
                    <div className="">{result.energy[10]}</div>
                </div>
            </button>
            {/* モーダル内容 */}
            <dialog id="energy_modal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl min-h-[20%] bg-white">
                    <button htmlFor="energy_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    <div className='text-black'>
                        <div className="sm:mx-4 sm:mt-0 mt-5 text-sm leading-6 overflow-x-auto">
                            <table className="border-collapse">
                                <thead>
                                    <tr>
                                    {energy_th.map((val,i) =>
                                             <th key={i} className="border px-3 py-1 ">{val}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* {console.log(result.energy)} */}
                                        {result.energy.map((val,i) =>
                                             <td key={i} className="border px-3 py-1 ">{val}</td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={`mx-4 text-sm p-4 rounded `}>
                            エネルギー対して排気口（初年期、中年期、晩年気の総和）が小さいと病気、離婚、干されるなどの現象が起こりやすい。<br />
                            逆にエネルギーに対して排気口が大きいと短命になりやすいと言われている。<br />
                            妻のエネルギーが高い場合は夫は短命。逆は妻が病気がちになりやすい。
                        </p>
                    </div>
                </form>
            </dialog>
        </div>
    )
}