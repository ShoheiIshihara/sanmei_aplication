import { configureStore } from "@reduxjs/toolkit";
import AppraisedParsonReducer from "./modules/AppraisedParson";
import ResultReducer from "./modules/Calculation";
import CommonReducer from "./modules/Common";


export default configureStore({
    reducer: {
        appraisedParson: AppraisedParsonReducer,
        result: ResultReducer,
        commonOption: CommonReducer
    }
});