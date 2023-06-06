import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";

import { lead, storeUpdateParson, getAppraisedParsonListFromApi} from "../../store/modules/AppraisedParson";
import { calculation, getCalculationResultFromApi, getCompatibilityResultFromApi} from "../../store/modules/Calculation";
import { setIsLoading, resetIsLoading } from '../../store/modules/Common';

import RadioInput from '@/Components/input/RadioInput';


export default function AppraisedParsonList(props){
    const appared_parsons = useSelector(state => state.appraisedParson.appraisedParsonList);
    const appared_parsons2 = useSelector(state => state.appraisedParson.appraisedParsonList);

    const isLoading = useSelector(state => state.commonOption.isLoading);

    const user_id = props.props.auth.user.id;
    const dispatch = useDispatch();

    //鑑定者リストの取得
    async function appraisedParsonListLead() {
        dispatch(setIsLoading());
        await dispatch(getAppraisedParsonListFromApi(user_id));
        setTimeout(() => {
            dispatch(resetIsLoading());
        }, 500);
    }
    useEffect(() => {appraisedParsonListLead();},[]);

    async function kantei () {
        dispatch(setIsLoading());
        // console.log('kantei');
        function getParsonData(tagName){
            let  id='';
            let elements = document.getElementsByName(tagName);
            let len = elements.length;
            let checked_chk = 0;

            for (let i = 0; i < len; i++){
                if (elements.item(i).checked){
                    id = i;
                    checked_chk = checked_chk + 1;
                }
            }
            if(checked_chk==0){ //選択されていないならfalseをリターン
                return false;
            }
            return  appared_parsons[id]; //元データの配列から対象のidのデータを取得
        };
        //一人目
        const first_parson_data = getParsonData('first_parson');
        //二人目
        const second_parson_data = getParsonData('second_parson');
        //一人目、二人目のリターンにfalseがあるならエラーを吐いてエンド
        if (!first_parson_data || !second_parson_data){
            window.alert('更新する対象が選択されていません。')
            setTimeout(() => {
                dispatch(resetIsLoading());
            }, 500);
            return
        }
        const parsons = {
            'first_parson' : first_parson_data,
            'second_parson' : second_parson_data
        };

        await dispatch(getCompatibilityResultFromApi(parsons));

        setTimeout(() => {
            dispatch(resetIsLoading());
        }, 500);

    }
    return (
        <>
        <div className='pl-6 pt-3 text-xl'>一人目選択</div>

        <div className="h-32 mx-2 bg-white border p-2 rounded  overflow-y-scroll sm:h-1/4">
            {appared_parsons.map((appared_parson,key)=>{
                return (
                <div className="list-card hover:bg-ebb-50 " key={key}>
                    <label htmlFor={appared_parson.appraised_parsons_id} className="">
                        <div className="flex w-72 flex-wrap border-t border-b border-ebb-100 px-2 py-4">
                                <div className="list-checkbox w-5 m-2 ">
                                <RadioInput  id={appared_parson.appraised_parsons_id} name="first_parson"  />
                                </div>
                                <div className="text-2xl w-48 mb-1">
                                    {appared_parson.appraised_parsons_name}<span className="text-base ml-2">様</span>
                                </div>
                                <div className="list-birthday ml-12 w-24">
                                    {appared_parson.birth_year+'.'+appared_parson.birth_month+'.'+appared_parson.birth_day}
                                </div>
                                <div  className="list-gender w-24">
                                    { appared_parson.gender == 0 ? '男性' : '女性' }
                                </div>
                        </div>

                    </label>
                </div>
            )})}
        </div>
        <div className='pl-6 pt-3 text-xl'>二人目選択</div>
         <div className="h-32 mx-2 bg-white border p-2 rounded  overflow-y-scroll sm:h-1/4">
         {appared_parsons.map((appared_parson2,key)=>{
             return (
             <div className="list-card hover:bg-ebb-50 " key={key}>
                 <label htmlFor={`parson2_${appared_parson2.appraised_parsons_id}`} className="">
                     <div className="flex w-72 flex-wrap border-t border-b border-ebb-100 px-2 py-4">
                             <div className="list-checkbox w-5 m-2 ">
                             <RadioInput  id={`parson2_${appared_parson2.appraised_parsons_id}`} name="second_parson"  />
                             </div>
                             <div className="text-2xl w-48 mb-1">
                                 {appared_parson2.appraised_parsons_name}<span className="text-base ml-2">様</span>
                             </div>
                             <div className="list-birthday ml-12 w-24">
                                 {appared_parson2.birth_year+'.'+appared_parson2.birth_month+'.'+appared_parson2.birth_day}
                             </div>
                             <div  className="list-gender w-24">
                                 { appared_parson2.gender == 0 ? '男性' : '女性' }
                             </div>
                     </div>

                 </label>
             </div>
         )})}
     </div>
     <button className='w-full mx-2 my-6 py-2 text-white bg-ebb-700 hover:bg-ebb-500' onClick={kantei}>鑑定</button>
     </>
    )
}
