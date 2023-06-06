import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { isEmpty } from 'lodash';

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
        <div className='mx-auto w-11/12 h-[150px]'>
              <div className="card shadow-md  h-full w-full bg-white hover:shadow-2xl hover:scale-105 transition ease-in-out duration-700 " onClick={()=>window.tenchusatsu_modal.showModal()}>
                    <div className="card-body text-center">
                        <h2 className="card-title mx-auto">天中殺</h2>
                        <p>{result.kanshi_detail.nikkanshi_detail.tenchusatsu_detail[0].tenchusatsu}</p>
                    </div>
                </div>
                 {/* モーダル内容 */}
            <dialog id="tenchusatsu_modal" className="modal ">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl bg-white">
                    <button htmlFor="tenchusatsu_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                    <div className='text-black'>
                        <p>直近の年天中殺は{startDateTimeStr}〜{endDateTimeStr}になります。</p>
                        <p>直近の月天中殺は{startDateTimeMonthStr}〜{endDateTimeMonthStr}になります。</p>
                    </div>
                </form>
            </dialog>
        </div>
    )
}