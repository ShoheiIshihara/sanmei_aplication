import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';


import { getCalcIsouMonthFromApi, getCalcIsouDayFromApi} from "../../../store/modules/Calculation";
import { setIsLoading, resetIsLoading } from '../../../store/modules/Common';
import ResultIsouDetailContent from "./ResultIsouDetailContent"



import Radiobtn from '@/Components/input/Radiobtn';
import Selectbox from '@/Components/input/Selectbox';


export default function ResultIsouTableContent ({isouTiming}) {

    const dispatch = useDispatch();
    const isohoResults = useSelector(state => state.result.result.isoho);
    const kanshiNo = useSelector(state => state.result.result.sanmei.action_area);

    const [ selectIso, setSelectIsou] = useState(isouTiming)

    const [ selectRow, setSelectRow] = useState('')

    const [ isOpenWest, setIsOpenWest] = useState(false)
    const [ isOpenCenter, setIsOpenCenter] = useState(false)
    const [ isOpenEast, setIsOpenEast] = useState(false)


    const [ subYear, setSubYear] = useState(isohoResults['tsukiun']['0']['date'].split('/')['0'])
    const [ subMonth, setSubMonth] = useState(isohoResults['tsukiun']['0']['date'].split('/')['1'])
    // console.log(selectIso);
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

    const changePeriodGetResult = async(e)=>{
        dispatch(setIsLoading());
        //name属性により年の変更か月の変更かを判断し、処理を分岐する
        switch(e.target.name){
            case 'subYear':
                //年が変更されたら、月運と日運の両方を再計算する
                let year = e.target.value;
                setSubYear(year);
                await dispatch(getCalcIsouMonthFromApi(kanshiNo,year));
                await dispatch(getCalcIsouDayFromApi(kanshiNo,year,subMonth))
                break;
            case 'subMonth':
                //月が変更されたら、日運のみ再計算する
                let month = e.target.value;
                setSubMonth(month);
                // await dispatch(getCalcIsouMonthFromApi(kanshiNo,subYear));
                await dispatch(getCalcIsouDayFromApi(kanshiNo,subYear,month))
                break;
        }
        setTimeout(() => {
            dispatch(resetIsLoading());
        }, 500);

    }
    useEffect(()=>{
        setSelectRow('');
        setIsOpenWest(false);
        setIsOpenCenter(false);
        setIsOpenEast(false);
    // },[selectIso])
    },[])

    // console.log(selectRow);

    // useEffect(()=>{
    //     // console.log(selectIso);
    //     switch(selectIso){
    //         case 'taiun':
    //             for(let i = 0; i < isohoResults[selectIso].length; i++){
    //                 // console.log(isohoResults[selectIso][i]);
    //                 setSelectRow('10');
    //             }
    //     }
    //     let firstSelectedRow = document.querySelectorAll("input[name=isohoTable1]");
    //     if( 0 < firstSelectedRow.length){
    //         for(let data of firstSelectedRow){
    //             if( data.checked){
    //                 console.log(data);
    //             }
    //         }
    //     }
    //     // console.log(firstSelectedRow);
    // },[])

    const tabStyle = 'flex h-10 rounded-t-lg px-3  py-2 bg-ebb-100 text-ebb-50 border border-b-0 tracking-widest cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50 peer-checked:border-none ';

    return (
       <>
       <div>
            {/* 年、月の選択の表示　月運のときは年　日運のときは年と月を表示させる */}
            <div className='flex justify-center mb-3 sm:justify-end sm:mb-0  sm:w-[887px] '>
                <div className={` ${!(selectIso=='tsukiun' || selectIso=='hiun') ? 'opacity-0' : ''}`}>
                    <Selectbox
                        name="subYear" MaxValue='2076' MinValue='1920' time="年" key='sub_year'
                        handleChange={changePeriodGetResult}
                        editValue={subYear}
                    />
                </div>
                <div className={` ${!(selectIso=='hiun') ? 'opacity-0' : ''}`}>
                    <Selectbox
                        name="subMonth" MaxValue='12' MinValue='1' time="月" key='subMonth'
                        handleChange={changePeriodGetResult}
                        editValue={subMonth}
                    />
                </div>
            </div>
            {/* 選択tab */}
            <div className='grid grid-cols-4 sm:grid-cols-6  sm:w-[887px] '>
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
                <Radiobtn
                    id="tsukiun"
                    name={`selectIsoho-${isouTiming}`}
                    value="tsukiun"
                    handleChange={(e)=>setSelectIsou(e.target.value)}
                    checked={selectIso==="tsukiun"}
                    label="月運"
                    inputStyle={"hidden peer"}
                    labelStyle={tabStyle}
                />
                <Radiobtn
                    id="hiun"
                    name={`selectIsoho-${isouTiming}`}
                    value="hiun"
                    handleChange={(e)=>setSelectIsou(e.target.value)}
                    checked={selectIso==="hiun"}
                    label="日運"
                    inputStyle={"hidden peer"}
                    labelStyle={tabStyle}
                />
            </div>

            <div>
                <div className=' text-ebb-700  h-[600px]  sm:w-[887px] overflow-scroll'>
                    <table className='text-xs sm:text-sm  border'>
                        <thead className='sticky top-0 bg-ebb-600 text-ebb-50 h-8'>
                            <tr>
                                <th className='w-1 text-right'></th>
                                <th className={`w-8 text-left ${selectIso=='taiun' || selectIso=='nenun' ? '': 'hidden'}`}>西暦</th>
                                <th className={`w-8 text-center ${selectIso=='taiun' || selectIso=='nenun' ? '': 'hidden'}`}>年齢</th>
                                <th className={`w-8 text-center ${selectIso=='tsukiun' || selectIso=='hiun' ? '': 'hidden'}`}>日付</th>
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
                                        <td className={`text-left ${selectIso=='taiun' || selectIso=='nenun' ? '': 'hidden'}`}>{isohoResults[selectIso][index]['AD']}</td>
                                        <td className={`text-center ${selectIso=='taiun' || selectIso=='nenun' ? '': 'hidden'}`}>{isohoResults[selectIso][index]['age']}</td>
                                        <td className={`text-left ${selectIso=='tsukiun' || selectIso=='hiun' ? '': 'hidden'}`}>{isohoResults[selectIso][index]['date']}</td>
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
