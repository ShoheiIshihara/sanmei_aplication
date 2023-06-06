import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";

import Radiobtn from '@/Components/input/Radiobtn';
import ResultSumnei from '@/Components/result/ResultSamnei';
import ResultCalender from '@/Components/result/ResultCalender';
import ResultIsoho from '@/Components/result/ResultIsoho';
import ResultDoubutsu from '@/Components/result/ResultDoubutsu';
import ResultCompatibility from '@/Components/result/ResultCompatibility';
import { ExportPdfComponent } from './result/ExportPdfComponent';
import { setSelectResult } from '../store/modules/Common';

export default function Result(){
    const dispatch = useDispatch();
    const profile = useSelector(state => state.result.result.profile);
    const selectResult = useSelector(state => state.commonOption.selectResult);
    const isCompatibility = useSelector(state => state.commonOption.isCompatibility);

    // console.log(selectResult);


    // console.log(profile);
    //結果表示切り替え用
    // const [ selectResult, setSelectResult] = useState('sanmei')

    useEffect(() =>{

    },[])
    // console.log(selectResult)

    return (
        <>
            {isCompatibility === 'parsonal' ? <>
                <div className={ `bg-ebb-50 w-full h-full  z-0 ${profile.name =="" ? "hidden":""}` } >
                        <div className=" sm:h-16   sm:flex sm:gap-5  sm:justify-between">
                            <p className="text-2xl text-center sm:text-left m-3 sm:ml-5 ">{profile.name} 様
                                <span className="text-sm ml-5">
                                    {profile.birth_year}.{profile.birth_month}.{profile.birth_day}
                                </span>
                                <span className="text-sm ml-2">{profile.gender ==0 ? "男性":"女性"}</span>
                            </p>
                            <nav className='flex gap-5 justify-center'>
                                <Radiobtn
                                    id="sanmei"
                                    name="select_result"
                                    value="sanmei"
                                    handleChange={(e) => dispatch(setSelectResult(e.target.value))}
                                    checked={selectResult==="sanmei"}
                                    label="算命学"
                                    inputStyle={"hidden peer"}
                                    labelStyle={"flex rounded flex sm:my-5 px-3 py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                                />
                                <Radiobtn
                                    id="isoho"
                                    name="select_result"
                                    handleChange={(e) => dispatch(setSelectResult(e.target.value))}
                                    value="isoho"
                                    checked={"isoho"===selectResult}
                                    label="位相法"
                                    inputStyle={"hidden peer"}
                                    labelStyle={"flex rounded flex sm:my-5 px-3 py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                                />
                                <Radiobtn
                                    id="doubutsu"
                                    name="select_result"
                                    value="doubutsu"
                                    handleChange={(e) => dispatch(setSelectResult(e.target.value))}
                                    checked={"doubutsu"===selectResult}
                                    label="個性心理学"
                                    inputStyle={"hidden peer"}
                                    labelStyle={"flex rounded mb-3 sm:my-5 sm:mr-5 px-3  py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                                />
                                {/* <Radiobtn
                                    id="compatibility"
                                    name="select_result"
                                    value="compatibility"
                                    handleChange={(e) => dispatch(setSelectResult(e.target.value))}
                                    checked={"compatibility"===selectResult}
                                    label="compatibility"
                                    inputStyle={"hidden peer"}
                                    labelStyle={"flex rounded mb-3 sm:my-5 sm:mr-5 px-3  py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                                /> */}
                                <Radiobtn
                                    id="pdf"
                                    name="select_result"
                                    value="pdf"
                                    handleChange={(e) => dispatch(setSelectResult(e.target.value))}
                                    checked={"pdf"===selectResult}
                                    label="ダウンロード"
                                    inputStyle={"hidden peer"}
                                    labelStyle={"flex rounded mb-3 sm:my-5 sm:mr-5 px-3  py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                                />
                            </nav>
                        </div>
                        {selectResult==="sanmei" ? <ResultSumnei/> :selectResult==="isoho" ? <ResultIsoho /> : selectResult==="doubutsu" ? <ResultDoubutsu /> : selectResult==="pdf" ? <ExportPdfComponent /> :"" }
                </div>
            </>:
            <><ResultCompatibility /></>}
        </>
    )
}
