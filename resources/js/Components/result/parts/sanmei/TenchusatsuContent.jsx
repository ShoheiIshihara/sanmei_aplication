import React from 'react';
import { useSelector } from "react-redux";

import ModalLayout from '../ModalLayout';

export default function TenchusatsuContent(){
    const result = useSelector(state => state.result.result.sanmei);
    const startDateTimeUnix = new Date(result.tenchusatsu_term.start_date_unix * 1000);
    const startDateTimeStr = startDateTimeUnix.toLocaleDateString();

    const endDateTimeUnix = new Date(result.tenchusatsu_term.end_date_unix * 1000);
    const endDateTimeStr = endDateTimeUnix.toLocaleDateString();

    const startDateTimeMonthUnix = new Date(result.tenchusatsu_term_month.start_date_unix * 1000);
    const startDateTimeMonthStr =  startDateTimeMonthUnix.toLocaleDateString();
    const endDateTimeMonthUnix = new Date(result.tenchusatsu_term_month.end_date_unix * 1000);
    const endDateTimeMonthStr = endDateTimeMonthUnix.toLocaleDateString();
    return(
        <div className='mx-auto w-full  h-[200px]'>
            <div className="card shadow-md  h-full w-full bg-white " >
                <div className="card-body text-center pb-1" >
                    <h2 className="card-title mx-auto">天中殺</h2>
                    <p className='text-5xl font-bold text-center '>{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}</p>
                </div>
                <div className='flex justify-center w-full gap-2 mb-2'>
                    <button className='btn btn-secondary hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700' onClick={()=>window.tenchusatsu_modal.showModal()}>解説</button>
                </div>
            </div>

            {/* モーダル内容 */}
            <ModalLayout title='天中殺解説' idName='tenchusatsu_modal'>
                <p className='text-xl font-semibold '>{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}</p>
                <p className='text-xl mx-4'>{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu_detail}</p>
                <p className='text-xl mx-4 mt-6'>直近の年天中殺は<span className='text-2xl font-semibold text-sea-pink-700'>{startDateTimeStr}〜{endDateTimeStr}</span>になります。</p>
                <p className='text-xl mx-4'>直近の月天中殺は<span className='text-2xl font-semibold text-sea-pink-700'>{startDateTimeMonthStr}〜{endDateTimeMonthStr}</span>になります。</p>
            </ModalLayout>
        </div>
    )
}