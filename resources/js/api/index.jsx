// const urlAPI ='http://127.0.0.1:8000/api'; //API接続先
const urlAPI ='https://sanmei-application.com/api'; //API接続先



//リスト取得
const getAppraisedParsonList = (user_id) => {
    return  new Promise((resolve)=>{

        axios.get(urlAPI + "/appraisedparsonregister/show", {
            params: {
                user_id : user_id
            }
        }).then((res) =>{
            resolve(res.data);

        })
    })
}

//
const postRegistParsonAtApi = async (user_id,registParson) => {
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
        return;
    })
}

const patchUpdateParsonAtApi = async (updateParson) => {
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
        return;
    })
}

const deleteAtApi = async (appraised_parsons_id) => {
    await axios.delete(urlAPI + "/appraisedparsonregister/destroy",{
        params: {
            appraised_parsons_id :  appraised_parsons_id
        }
    }).then((res) =>{
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
            }
        }).then((res) =>{
            resolve(res.data);
        })
    })
}

const calcIsouMonthAtApi = (kanshiNo, subYear) =>{
    return new Promise((resolve)=>{
        axios.get(urlAPI + "/calclation/isouMonth", {
            params: {
                year : subYear,
                nikkanshiNo : kanshiNo.nikkanshi_id,
                gekkanshiNo : kanshiNo.gekkanshi_id,
                nenkanshiNo : kanshiNo.nenkanshi_id,
            }
        }).then((res) =>{
            resolve(res.data);
        })
    })
}
const calcIsouDayAtApi = (kanshiNo, subYear, subMonth) =>{
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
            resolve(res.data);
        })
    })
}

const getCompatibilityResultAtApi = (parsons) =>{
    return new Promise((resolve)=>{
        axios.get(urlAPI + "/calclation/compatibility",{
            params:{
                'first_parson' : parsons.first_parson,
                'second_parson' : parsons.second_parson
            }
        }).then((res) =>{
            resolve(res.data);
        })
    })
}


export { getAppraisedParsonList, postRegistParsonAtApi, patchUpdateParsonAtApi, deleteAtApi, calculationAtApi, calcIsouMonthAtApi, calcIsouDayAtApi, getCompatibilityResultAtApi };
