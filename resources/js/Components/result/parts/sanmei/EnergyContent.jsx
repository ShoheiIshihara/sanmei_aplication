import React from 'react';
import { useSelector } from "react-redux";
import ModalLayout from '../ModalLayout';


export default function EnergyContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const energy_th = ['甲','乙','丙','丁','戊','己','庚','辛','壬', '癸','合計'];

    return(
        <div className='mx-auto w-full h-[200px]'>
            <div className="card shadow-md  h-full w-full bg-white">
                <div className="card-body  w-full pb-0">
                    <h2 className="card-title mx-auto">エネルギー</h2>
                    <div className="text-6xl font-bold text-center ">{result.energy[10]}</div>
                </div>
                <div className='flex justify-center w-full gap-2 mb-2'>
                    {/* <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.energy_modal.showModal()}>解説</button> */}
                </div>
            </div>
            {/* モーダル内容 */}
            <ModalLayout title='エネルギー解説' idName='energy_modal'>
            <div className="sm:mx-4 sm:mt-0 mt-5  leading-6 overflow-x-auto">
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
            <p className={`mx-4 p-4 rounded `}>
                エネルギー対して排気口（初年期、中年期、晩年気の総和）が小さいと病気、離婚、干されるなどの現象が起こりやすい。<br />
                逆にエネルギーに対して排気口が大きいと短命になりやすいと言われている。<br />
                妻のエネルギーが高い場合は夫は短命。逆は妻が病気がちになりやすい。
            </p>
            </ModalLayout>
        </div>
    )
}