import React from 'react';
import axios from 'axios';
import Modal from 'react-modal'
import { isEmpty } from 'lodash';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";


import InputLabel from '@/Components/input/InputLabel';
import TextInput from '@/Components/input/TextInput';
import Selectbox from '@/Components/input/Selectbox';
import Radiobtn from '@/Components/input/Radiobtn';
import PrimaryButton from '@/Components/input/PrimaryButton';

import AppraisedParsonList from '@/Components/sidemenu/AppraisedParsonList';
import CompatibilityList from '@/Components/sidemenu/CompatibilityList';
import { storeRegistParson, storeUpdateParson, getAppraisedParsonListFromApi} from "../store/modules/AppraisedParson";
import { postRegistParsonAtApi, patchUpdateParsonAtApi, deleteAtApi } from '@/api';
import { setIsLoading, resetIsLoading, setIsCompatibility, resetIsCompatibility} from '../store/modules/Common';
import { calculation, getCalculationResultFromApi} from "../store/modules/Calculation";


export default function SideMenu(props){
    const dispatch = useDispatch();
    const user_id = props.props.auth.user.id;
    const appared_parsons = useSelector(state => state.appraisedParson.appraisedParsonList);
    const registParson = useSelector(state => state.appraisedParson.registParson);
    const updateParson = useSelector(state => state.appraisedParson.updateParson);
    const isCompatibility = useSelector(state => state.commonOption.isCompatibility);
    const [ editMode_flg, setEditMode_flg ] = React.useState(false) //編集かどうかのフラグ設定

    //modal
    Modal.setAppElement("#app"); // これがないと警告が出る
    const customStyles = {
        content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
        }
    };
    var subtitle;
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#625254';
    }

    function closeModal(){
        setIsOpen(false);
        setEditMode_flg(false);
    }

    //新規登録
    const submit = async () => {
        dispatch(storeRegistParson({type:"initialize"}))
          if(isEmpty(registParson.newName)){
            window.alert('氏名が入力されていません。')
            return
        }
        if(window.confirm(`${registParson.newName}  ${registParson.newBirthYear}.${registParson.newBirthMonth}.${registParson.newBirthDay}のデータを追加しますか？`)){
            const user_id = props.props.auth.user.id;
            await postRegistParsonAtApi(user_id, registParson);
            window.alert('登録が完了しました。');
            dispatch(getAppraisedParsonListFromApi(user_id));
            closeModal()
        }
    };

    //データ変更のための選択された要素の取得
    const edit = () =>{
        //チェックされたradioボタンのインデックス番号とappraised_parsons_idを取得する
        let elements = document.getElementsByName('list'); //listのradioボタン要素を取得
        let len = elements.length;  //要素の数を取得
        let checked_chk = 0;
        let appraised_parsons_id = ''; //idの初期化
        let index = "";//indexの初期化
        for (let i = 0; i < len; i++){  //どのradioボタンがチェックされているのかを確認
            if (elements.item(i).checked){
                appraised_parsons_id = elements.item(i).id;
                index = i;
                checked_chk = checked_chk + 1;
            }
        }
        if(checked_chk==0){
            window.alert('更新する対象が選択されていません。')
            return
        }
        const focus = appared_parsons[index]; //元データの配列から対象のidのデータを取得
         dispatch(storeUpdateParson({type:"read",value:focus}))
        setEditMode_flg(true);
        openModal();
    }

    const editSubmit = async(event) => {

        if(window.confirm(`${updateParson.editName}のデータを更新しますか？`)){//window.confirmにて削除の確認。trueなら実行
            await patchUpdateParsonAtApi(updateParson);
            dispatch(getAppraisedParsonListFromApi(user_id));
            window.alert('更新が完了しました。');
            closeModal()



            dispatch(setIsLoading());

            await dispatch(getAppraisedParsonListFromApi(user_id));
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
        }



    }
    //削除
    const deleted = async() => {
        //チェックされたradioボタンのインデックス番号とappraised_parsons_idを取得する
        let elements = document.getElementsByName('list'); //listのradioボタン要素を取得
        let len = elements.length;  //要素の数を取得
        let checked_chk = 0;
        let appraised_parsons_id = ''; //idの初期化
        let index = "";//indexの初期化

        for (let i = 0; i < len; i++){  //どのradioボタンがチェックされているのかを確認
            if (elements.item(i).checked){
                appraised_parsons_id = elements.item(i).id;
                index = i;
                checked_chk = checked_chk + 1;
            }
        }
        if(checked_chk==0){
            window.alert('削除する対象が選択されていません。')
            return
        }
        const focus = appared_parsons[index]; //元データの配列から対象のidのデータを取得
        dispatch(storeUpdateParson({type:"read",value:focus}))

        if(window.confirm(`${updateParson.editName}のデータを削除しますか？`)){//window.confirmにて削除の確認。trueなら実行
            await deleteAtApi(updateParson.appraised_parsons_id)
            dispatch(getAppraisedParsonListFromApi(user_id));//リスト再読込
            window.alert('削除しました。');
        }
    };
    //modal end

    return(
        <div className=" w-[300px]">
            {/* menu select */}
            <div className='flex justify-evenly'>
                <Radiobtn
                    id="parsonal"
                    name="mode"
                    value="parsonal"
                    handleChange={(e) => dispatch(setIsCompatibility(e.target.value))}
                    checked={isCompatibility==='parsonal'}
                    label="個人鑑定"
                    inputStyle={"hidden peer"}
                    labelStyle={"flex rounded mb-2 sm:my-5  px-3 py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                />
                <Radiobtn
                    id="compatibilityl"
                    name="mode"
                    value="compatibility"
                    handleChange={(e) => dispatch(setIsCompatibility(e.target.value))}
                    checked={isCompatibility==='compatibility'}
                    label="相性鑑定"
                    inputStyle={"hidden peer"}
                    labelStyle={"flex rounded mb-2 sm:my-5 px-3 py-1 bg-ebb-200 text-ebb-50 cursor-pointer peer-checked:bg-ebb-600 peer-checked:text-ebb-50"}
                />
            </div>
            <p className="text-center py-1 w-full text-xl text-ebb-100 bg-ebb-600 tracking-widest">鑑定者リスト</p>
            <div className="grid grid-cols-3">
                <button variant="success" className="m-1 rounded hover:bg-ebb-200 " onClick={openModal}> + 新規登録</button>
                <button variant="success" className="m-1 rounded hover:bg-ebb-200  " onClick={edit}> データ更新</button>
                <button variant="success" className="m-1 rounded hover:bg-ebb-200 " onClick={deleted}> - データ削除</button>
            </div>
            {/* modal */}
            <div>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                    <div className='m-5'>
                        <h2 ref={_subtitle => (subtitle = _subtitle)} className=" text-center mx-2 mb-2">鑑定者データ{editMode_flg ? "変更":"登録"}</h2>
                        <hr className="pb-5"/>
                        <button variant="success" className="px-3 py-2 absolute top-1 right-3" onClick={closeModal}>&#215;</button>
                            <div>
                                <div className="mb-5">
                                    <InputLabel forInput="name" value="氏名" />

                                    <TextInput
                                        name="appraisedParsonName"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        required
                                        editValue={editMode_flg ? updateParson.editName: ""}
                                        handleChange= {editMode_flg ? (e) => dispatch(storeUpdateParson({type:"name" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"name" ,value:e.target.value}))}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputLabel  value="生年月日" />

                                    <Selectbox
                                        name="birth_year" MaxValue='2076' MinValue='1920' time="年" key='birth_year'
                                        handleChange={editMode_flg ? (e) => dispatch(storeUpdateParson({type:"birth_year" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"birth_year" ,value:e.target.value}))}
                                        editValue={editMode_flg ? updateParson.editBirthYear : 1990}
                                    />
                                    <Selectbox
                                        name="birth_month" MaxValue='12' MinValue='1'time="月"
                                        handleChange={editMode_flg ? (e) => dispatch(storeUpdateParson({type:"birth_month" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"birth_month" ,value:e.target.value}))}
                                        editValue={editMode_flg ? updateParson.editBirthMonth: ""}
                                    />
                                    <Selectbox
                                        name="birth_day" MaxValue='31' MinValue='1' time="日"
                                        handleChange={editMode_flg ? (e) => dispatch(storeUpdateParson({type:"birth_day" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"birth_day" ,value:e.target.value}))}
                                        editValue={editMode_flg ? updateParson.editBirthDay: ""}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <InputLabel  value="生まれた時間" />
                                    <Selectbox
                                        name="birth_hour" MaxValue='24' MinValue='0'time="時"
                                        handleChange={editMode_flg ? (e) => dispatch(storeUpdateParson({type:"birth_hour" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"birth_hour" ,value:e.target.value}))}
                                        editValue={editMode_flg ? updateParson.editBirthHour: ""}
                                    />
                                    <Selectbox
                                        name="birth_minite" MaxValue='59' MinValue='0' time="分"
                                        handleChange={editMode_flg ? (e) => dispatch(storeUpdateParson({type:"birth_minite" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"birth_minite" ,value:e.target.value}))}
                                        editValue={editMode_flg ? updateParson.editBirthMinite: ""}
                                    />

                                </div>
                                <div className="mb-10">
                                    <InputLabel forInput="gender" value="性別" />
                                    <div className="flex justify-evenly">
                                    <Radiobtn
                                        name="gender"
                                        value="1"
                                        id="gender-female"
                                        label="女性"
                                        checked={!editMode_flg ? true : updateParson.editGender=='1' }
                                        handleChange={editMode_flg ? (e) =>dispatch(storeUpdateParson({type:"gender" ,value:e.target.value}))  :(e) => dispatch(storeRegistParson({type:"gender" ,value:e.target.value}))}
                                    />
                                    <Radiobtn
                                        name="gender"
                                        value="0"
                                        id="gender-male"
                                        label="男性"
                                        checked={updateParson.editGender=="0"}
                                        handleChange={editMode_flg ? (e) =>dispatch(storeUpdateParson({type:"gender" ,value:e.target.value})) :(e) => dispatch(storeRegistParson({type:"gender" ,value:e.target.value}))}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-5">
                            <PrimaryButton className="" onClick={ editMode_flg ? editSubmit : submit} >
                                {editMode_flg ? "更新":"登録"}
                            </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            {/* modalend */}

            {/* //鑑定者リスト表示 */}
            {isCompatibility==='parsonal' 
                ? <AppraisedParsonList props={props.props}/>
                : <CompatibilityList props={props.props}/>
            }
        </div>
    )
};
