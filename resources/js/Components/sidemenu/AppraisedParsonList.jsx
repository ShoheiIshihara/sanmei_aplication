import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { storeUpdateParson, getAppraisedParsonListFromApi } from "../../store/modules/AppraisedParson";
import { getCalculationResultFromApi } from "../../store/modules/Calculation";
import { setIsLoading, resetIsLoading } from '../../store/modules/Common';

import RadioInput from '@/Components/input/RadioInput';

export default function AppraisedParsonList(props){
    const appared_parsons = useSelector(state => state.appraisedParson.appraisedParsonList);
    const isLoading = useSelector(state => state.commonOption.isLoading);
    const user_id = props.props.auth.user.id;
    const dispatch = useDispatch();

    // console.log(isLoading)

    //鑑定者リストの取得
    async function appraisedParsonListLead() {
        dispatch(setIsLoading());
        await dispatch(getAppraisedParsonListFromApi(user_id));
        setTimeout(() => {
            dispatch(resetIsLoading());
        }, 500);
    }

    //リスト選択後、算出
    const onHandleChange = async () => {
        dispatch(setIsLoading());
        let id ='';
        let elements = document.getElementsByName('list');
        let len = elements.length;
        for (let i = 0; i < len; i++){
            if (elements.item(i).checked){
                id = i;
            }
        }
        const focus = appared_parsons[id]; //元データの配列から対象のidのデータを取得
        await dispatch(storeUpdateParson({type:"read",value:focus}))
        await dispatch(getCalculationResultFromApi(focus));
        setTimeout(() => {
            dispatch(resetIsLoading());
        }, 500);
    };
    useEffect(() => {appraisedParsonListLead();},[]);
    return (
        <div className='h-full'>
            <div className="bg-white borderrounded overflow-y-scroll h-[500px] md:h-[800px] ">
                {appared_parsons.map((appared_parson,key)=>{
                    return (
                        <div className="list-card hover:bg-ebb-50 " key={key}>
                            <label htmlFor={appared_parson.appraised_parsons_id} className="">
                                <div className="flex w-70 flex-wrap border-t border-b border-ebb-100 px-2 py-4">
                                    <div className="list-checkbox w-5 m-2 ">
                                    <RadioInput  id={appared_parson.appraised_parsons_id} name="list" handleChange={onHandleChange} />
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
        </div>
    )
}
