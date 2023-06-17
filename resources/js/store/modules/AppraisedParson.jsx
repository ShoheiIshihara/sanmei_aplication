import { createSlice } from "@reduxjs/toolkit";
import { getAppraisedParsonList } from "@/api";

const appraisedParson = createSlice({
    name: 'appraisedParson',
    initialState: {
        appraisedParsonList:[],
        registParson:{
            newName:"",
            newBirthYear:"1990",
            newBirthMonth:"1",
            newBirthDay:"1",
            newBirthHour:"0",
            newBirthMinite:"0",
            newGender:"1",
        },
        updateParson:{
            appraised_parsons_id:"",
            editName:"",
            editBirthYear:"",
            editBirthMonth:"",
            editBirthDay:"",
            editBirthHour:"",
            editBirthMinite:"",
            editGender:"",
        }
    },
    reducers: {
        lead(state, getAppraisedParsonList){
            const newState = {...state};
            newState.appraisedParsonList = getAppraisedParsonList.payload;
            return newState;
        },
        storeRegistParson(state,payload){
            const newState={...state};
            switch(payload.payload.type){
                case "name":
                    newState.registParson.newName = payload.payload.value;
                    state=newState;
                    break;
                case "birth_year":
                    newState.registParson.newBirthYear = payload.payload.value;
                    state=newState;
                    break;
                case "birth_month":
                    newState.registParson.newBirthMonth = payload.payload.value;
                    state=newState;
                    break;
                case "birth_day":
                    newState.registParson.newBirthDay = payload.payload.value;
                    state=newState;
                    break;
                case "birth_hour":
                    newState.registParson.newBirthHour = payload.payload.value;
                    state=newState;
                    break;
                case "birth_minite":
                    newState.registParson.newBirthMinite = payload.payload.value;
                    state=newState;
                    break;
                case "gender":
                    newState.registParson.newGender = payload.payload.value;
                    state=newState;
                    break;
                case "initialize":
                    newState.registParson = {
                        newName:"",
                        newBirthYear:"1990",
                        newBirthMonth:"1",
                        newBirthDay:"1",
                        newBirthHour:"",
                        newBirthMinite:"",
                        newGender:"1",
                    }
                    state=newState;
                    break;
                default:
                    return state;
            }
        },
        storeUpdateParson(state,payload){
            const newState={...state};
            switch(payload.payload.type){
                case "read":
                    newState.updateParson.appraised_parsons_id = payload.payload.value.appraised_parsons_id;
                    newState.updateParson.editName = payload.payload.value.appraised_parsons_name;
                    newState.updateParson.editBirthYear = payload.payload.value.birth_year;
                    newState.updateParson.editBirthMonth = payload.payload.value.birth_month;
                    newState.updateParson.editBirthDay = payload.payload.value.birth_day;
                    newState.updateParson.editBirthHour = payload.payload.value.birth_hour;
                    newState.updateParson.editBirthMinite = payload.payload.value.birth_minite;
                    newState.updateParson.editGender = payload.payload.value.gender;
                    state=newState;
                    break;
                case "name":
                    newState.updateParson.editName = payload.payload.value;
                    state=newState;
                    break;
                case "birth_year":
                    newState.updateParson.editBirthYear = payload.payload.value;
                    state=newState;
                    break;
                case "birth_month":
                    newState.updateParson.editBirthMonth = payload.payload.value;
                    state=newState;
                    break;
                case "birth_day":
                    newState.updateParson.editBirthDay = payload.payload.value;
                    state=newState;
                    break;
                case "birth_hour":
                    newState.updateParson.editBirthHour = payload.payload.value;
                    state=newState;
                    break;
                case "birth_minite":
                    newState.updateParson.editBirthMinite = payload.payload.value;
                    state=newState;
                    break;
                case "gender":
                    newState.updateParson.editGender = payload.payload.value;
                    state=newState;
                    break;
                case "initialize":
                    newState.updateParson = {
                        id:"",
                        editName:"",
                        editBirthYear:"",
                        editBirthMonth:"",
                        editBirthDay:"",
                        editBirthHour:"",
                        editBirthMinite:"",
                        editGender:"",
                    }
                    state=newState;
                    break;
                default:
                    return state;
            }

        }
    }
})

const { lead, storeRegistParson, storeUpdateParson } = appraisedParson.actions;

const getAppraisedParsonListFromApi =  (user_id) => {
    return  async (dispatch) => {
        const res = await getAppraisedParsonList(user_id);
        dispatch(lead(res));
    }
}

  export { lead, storeRegistParson, storeUpdateParson, getAppraisedParsonListFromApi};
  export default appraisedParson.reducer;
