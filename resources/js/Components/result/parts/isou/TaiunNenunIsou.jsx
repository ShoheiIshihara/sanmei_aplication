import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";

import ResultIsouDetailContent from "./ResultIsouDetailContent"
import Radiobtn from '@/Components/input/Radiobtn';


export default function TaiunNenunIsou ({isouTiming}) {
    const isohoResults = useSelector(state => state.result.result.isoho);
    const [ selectIso, setSelectIsou] = useState(isouTiming)
    const [ selectRow, setSelectRow] = useState('')
    const [ isOpenWest, setIsOpenWest] = useState(false)
    const [ isOpenCenter, setIsOpenCenter] = useState(false)
    const [ isOpenEast, setIsOpenEast] = useState(false)

    const getTableTr = (e) =>{
        //クリックした要素を取得
        let targetElement = e.target;
        //要素の親を取得
        let parentTargetElement = targetElement.parentNode;
        //TRじゃない場合があるので、その場合はさらに親の要素を取得
        if(!(parentTargetElement.tagName=='TR')){
            parentTargetElement = parentTargetElement.parentNode;
        }
        //TR要素の最初の子要素（TD）のさらにその最初の子要素（input）のValueがindex番号なのでそれをselectRow1に設定
        setSelectRow(parentTargetElement.firstElementChild.firstElementChild.value);
    }
    
    useEffect(()=>{
        setSelectRow('');
        setIsOpenWest(false);
        setIsOpenCenter(false);
        setIsOpenEast(false);
    // },[selectIso])
    },[])

    const tabStyle = 'flex h-10 rounded-lg px-6 m-4 py-2 bg-ebb-100 text-ebb-50 border border-b-0 tracking-widest cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50 peer-checked:border-none ';

    return (
       <>
       <div>
            {/* 選択tab */}
            <div className='flex justify-center'>
                <Radiobtn
                    id="taiun"
                    name={`selectIsoho-${isouTiming}`}
                    value="taiun"
                    handleChange={(e)=>setSelectIsou(e.target.value)}
                    checked={selectIso==="taiun"}
                    label="大運"
                    inputStyle={"hidden peer"}
                    labelStyle={tabStyle}
                />
                <Radiobtn
                    id="nenun"
                    name={`selectIsoho-${isouTiming}`}

                    value="nenun"
                    handleChange={(e)=>setSelectIsou(e.target.value)}
                    checked={selectIso==="nenun"}
                    label="年運"
                    inputStyle={"hidden peer"}
                    labelStyle={tabStyle}
                />
            </div>
            <div>
                <div className=' text-ebb-700 h-[250px] md:h-[400px]  overflow-y-scroll  w-full '>
                    <table className='text-xs sm:text-sm border overflow-scroll  w-11/12 mx-auto px-10 '>
                        <thead className='sticky top-0 bg-ebb-600 text-ebb-50 h-8'>
                            <tr>
                                <th className='w-1 text-right'></th>
                                <th className={`w-8 text-left`}>西暦</th>
                                <th className={`w-8 text-center `}>年齢</th>
                                <th className='w-8  text-center'>干支</th>
                                <th className='w-12 text-center'>主星</th>
                                <th className='w-12 text-center'>従星</th>
                                <th className='w-auto text-center border-r text-sm'>西</th>
                                <th className='w-auto text-center border-r text-sm'>中央</th>
                                <th className='w-auto text-center border-r text-sm'>東</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(isohoResults[selectIso]).map((index) =>{
                                return(
                                    //selectRowとindexが同じなら背景色を変える
                                    <tr className={`${index==selectRow ? 'bg-sea-pink-200 hover:bg-sea-pink-200' : 'hover:bg-sea-pink-50 '}  h-10 cursor-pointer`} onClick={getTableTr} >
                                        <td className='hidden' value={index}><input type='radio' id={index} name='isohoTable1' value={index} /></td>
                                        <td className='text-right'>{isohoResults[selectIso][index]['tenchusatsu_flg'] ? '>':' '}</td>
                                        <td className={`text-left `}>{isohoResults[selectIso][index]['AD']}</td>
                                        <td className={`text-center`}>{isohoResults[selectIso][index]['age']}</td>
                                        <td className='text-center'>{isohoResults[selectIso][index]['kanshi']}</td>
                                        <td className='text-center'>{isohoResults[selectIso][index]['shusei']}</td>
                                        <td className='text-center'>{isohoResults[selectIso][index]['jusei']}</td>
                                        <td className='text-center border-r'>
                                            {Object.keys(isohoResults[selectIso][index]['west']).map((i,key)=>{
                                                return(
                                                    <span key={i} className={`${isohoResults[selectIso][index]['west'][key]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} font-semibold`}>
                                                        {isohoResults[selectIso][index]['west'][key]['isou_name']}
                                                        <span className={`${isohoResults[selectIso][index]['west'].length-1 == key ? 'hidden' : ''} text-gray-300 px-1`}>,</span>
                                                    </span>

                                                )
                                            })}
                                        </td>
                                        <td className='text-center border-r'>
                                            {Object.keys(isohoResults[selectIso][index]['center']).map((i,key)=>{
                                                return(
                                                    <span key={i} className={`${isohoResults[selectIso][index]['center'][key]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} font-semibold`}>
                                                        {isohoResults[selectIso][index]['center'][key]['isou_name']}
                                                        <span className={`${isohoResults[selectIso][index]['center'].length-1 == key ? 'hidden' : ''} text-gray-300 px-1`}>,</span>
                                                    </span>
                                                )
                                            })}
                                        </td>
                                        <td className='text-center'>
                                            {Object.keys(isohoResults[selectIso][index]['east']).map((i,key)=>{
                                                return(
                                                    <span key={i} className={`${isohoResults[selectIso][index]['east'][key]['gou_san']==1 ? 'text-red-300' : 'text-blue-500'} font-semibold`}>
                                                        {isohoResults[selectIso][index]['east'][key]['isou_name']}
                                                        <span className={`${isohoResults[selectIso][index]['east'].length-1 == key ? 'hidden' : ''} text-gray-300 px-1`}>,</span>
                                                    </span>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
                {(selectRow=='') ? '' :
                    <div className=''>
                        <ResultIsouDetailContent  title='西' isouData={isohoResults[selectIso][selectRow]} selectDirection='west'/>
                        <ResultIsouDetailContent  title='中央' isouData={isohoResults[selectIso][selectRow]} selectDirection='center'/>
                        <ResultIsouDetailContent  title='東' isouData={isohoResults[selectIso][selectRow]} selectDirection='east'/>
                    </div>
                }

            </div>
        </div>
        </>
    )
}
