import { useDispatch } from "react-redux";
import { setIsLoading, resetIsLoading } from '../store/modules/Common';


// const urlAPI ='http://127.0.0.1:8000/api'; //API接続先
const urlAPI ='https://sanmei-application.com/api'; //API接続先



//リスト取得
const getAppraisedParsonList = (user_id) => {
    return  new Promise((resolve)=>{

        // dispatch(setIsLoading());
        axios.get(urlAPI + "/appraisedparsonregister/show", {
            params: {
                user_id : user_id
            }
        }).then((res) =>{
            // console.log(res);
            resolve(res.data);

        })
    })
}

//
const postRegistParsonAtApi = async (user_id,registParson) => {
        // console.log("postRegistParsonAtApi")
        // console.log(registParson);
        await axios.post(urlAPI + "/appraisedparsonregister",{
        params: {
            name :  registParson.newName,
            birth_year :  registParson.newBirthYear,
            birth_month :  registParson.newBirthMonth,
            birth_day :  registParson.newBirthDay,
            birth_hour :  registParson.newBirthHour,
            birth_minite :  registParson.newBirthMinite,
            gender :  registParson.newGender,
            user_id : user_id,
        }
    }).then(() =>{
        // console.log('postRegistParsonAtApi Done!')
        return;
    })
}

const patchUpdateParsonAtApi = async (updateParson) => {
    // console.log("patchUpdateParsonAtApi")
    // console.log(updateParson);
    await axios.patch(urlAPI + "/appraisedparsonregister/update",{
        params: {
            id : updateParson.appraised_parsons_id,
            name : updateParson.editName,
            birth_year : updateParson.editBirthYear,
            birth_month : updateParson.editBirthMonth,
            birth_day : updateParson.editBirthDay,
            birth_hour : updateParson.editBirthHour,
            birth_minite : updateParson.editBirthMinite,
            gender : updateParson.editGender,
        }
    }).then((res) =>{
        // console.log(res.data)
        return;
    })
}

const deleteAtApi = async (appraised_parsons_id) => {
    await axios.delete(urlAPI + "/appraisedparsonregister/destroy",{
        params: {
            appraised_parsons_id :  appraised_parsons_id
        }
    }).then((res) =>{
        // console.log('deleteAtApi Done!')
        return;
    })
}

const calculationAtApi =(appraisedParson)=>{
    return  new Promise((resolve)=>{
        axios.get(urlAPI + "/calclation", {
            params: {
                name : appraisedParson['appraised_parsons_name'],
                birth_year : appraisedParson['birth_year'],
                birth_month : appraisedParson['birth_month'],
                birth_day : appraisedParson['birth_day'],
                birth_hour : appraisedParson['birth_hour'],
                birth_minite : appraisedParson['birth_minite'],
                gender : appraisedParson['gender'],
                // user_id : user_id
            }
        }).then((res) =>{
            // console.log(res.data);
            resolve(res.data);
        })
    })
}

const calcIsouMonthAtApi = (kanshiNo, subYear) =>{
    console.log(kanshiNo.nikkanshi_id)
    return new Promise((resolve)=>{
        axios.get(urlAPI + "/calclation/isouMonth", {
            params: {
                year : subYear,
                nikkanshiNo : kanshiNo.nikkanshi_id,
                gekkanshiNo : kanshiNo.gekkanshi_id,
                nenkanshiNo : kanshiNo.nenkanshi_id,
            }
        }).then((res) =>{
            // console.log(res.data);
            resolve(res.data);
        })
    })
}
const calcIsouDayAtApi = (kanshiNo, subYear, subMonth) =>{
    // console.log(kanshiNo.nikkanshi_id)
    return new Promise((resolve)=>{
        axios.get(urlAPI + "/calclation/isouDay", {
            params: {
                year : subYear,
                month: subMonth,
                nikkanshiNo : kanshiNo.nikkanshi_id,
                gekkanshiNo : kanshiNo.gekkanshi_id,
                nenkanshiNo : kanshiNo.nenkanshi_id,
            }
        }).then((res) =>{
            // console.log(res.data);
            resolve(res.data);
        })
    })
}

const getCompatibilityResultAtApi = (parsons) =>{
    console.log('api/index');
    console.log(parsons);
    return new Promise((resolve)=>{
        axios.get(urlAPI + "/calclation/compatibility",{
            params:{
                'first_parson' : parsons.first_parson,
                'second_parson' : parsons.second_parson
            }
        }).then((res) =>{
            console.log(res.data);
            resolve(res.data);
        })
    })
}


export { getAppraisedParsonList, postRegistParsonAtApi, patchUpdateParsonAtApi, deleteAtApi, calculationAtApi, calcIsouMonthAtApi, calcIsouDayAtApi, getCompatibilityResultAtApi };
