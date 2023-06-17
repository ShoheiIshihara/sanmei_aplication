import { createSlice } from "@reduxjs/toolkit";

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
            newState.isLoading = true;
            return newState;
        },
        resetIsLoading(state,payload){
            const newState = {...state};
            newState.isLoading = false;
            return newState;
        },
        setSelectResult(state,payload){
            const newState = {...state};
            newState.selectResult = payload.payload;
            return newState;
        },
        setIsCompatibility(state, payload){
            const newState = {...state};
            newState.isCompatibility = payload.payload;
            return newState;
        },
        resetIsCompatibility(state){
            const newState = {...state};
            newState.isCompatibility = 'parsonal';
            return newState;
        },

    }
})

const {setIsLoading, resetIsLoading, setSelectResult, setIsCompatibility, resetIsCompatibility, } = commonOption.actions;

export {commonOption, setIsLoading, resetIsLoading, setSelectResult, setIsCompatibility, resetIsCompatibility, };
export default commonOption.reducer;
