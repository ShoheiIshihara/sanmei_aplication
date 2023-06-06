import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const commonOption = createSlice({
    name:'commonOption',
    initialState:{
        isLoading:false,
        selectResult:'sanmei',
        isCompatibility: 'parsonal',
    },
    reducers:{
        setIsLoading(state,payload){
            const newState = {...state};
            // console.log('setIsLoading Done!')

            newState.isLoading = true;
            return newState;
            // state.isLoading = true;
        },
        resetIsLoading(state,payload){
            const newState = {...state};
            // console.log('resetIsLoading Done!')
            newState.isLoading = false;
            return newState;
        },
        setSelectResult(state,payload){
            const newState = {...state};
            newState.selectResult = payload.payload;
            return newState;
        },
        setIsCompatibility(state, payload){
            console.log(payload);
            const newState = {...state};
            newState.isCompatibility = payload.payload;
            return newState;
        },
        resetIsCompatibility(state){
            console.log('resetIsCompatibility');
            const newState = {...state};
            newState.isCompatibility = 'parsonal';
            return newState;

        }
    }
})

const {setIsLoading, resetIsLoading, setSelectResult, setIsCompatibility, resetIsCompatibility} = commonOption.actions;

export {commonOption, setIsLoading, resetIsLoading, setSelectResult, setIsCompatibility, resetIsCompatibility};
export default commonOption.reducer;
