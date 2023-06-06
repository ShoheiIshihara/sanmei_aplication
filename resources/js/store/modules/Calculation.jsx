import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { calculationAtApi, calcIsouMonthAtApi, calcIsouDayAtApi, getCompatibilityResultAtApi } from "@/api";

const calculation = createSlice({
    name: 'calculation',
    initialState: {
        result:{
            profile:{
                name:"",
                birth_year:"",
                birth_month:"",
                birth_day:"",
                birth_hour:"",
                birth_minite:"",
                gender:""
            },
            sanmei:{
                insen: {
                    nikkan: "日干",
                    nisshi: "日支",
                    nikkanshizoukan1: "　",
                    nikkanshizoukan2: "　",
                    nikkanshizoukan3: "　",
                    gekkan:"月干",
                    gesshi:"月支",
                    gekkanshizoukan1:"　",
                    gekkanshizoukan2:"　",
                    gekkanshizoukan3: "　",
                    nenkan: "年干",
                    nenshi: "年支",
                    nenkanshizoukan1: "　",
                    nenkanshizoukan2:"　",
                    nenkanshizoukan3: "　",
                    nikkanshizoukanflg:"",
                    gekkanshizoukanflg :"",
                    nenkanshizoukanflg :""
                },
                yousen: {
                    bansei: "",
                    center: "中央",
                    east: "東",
                    first: "初年気",
                    last: "晩年気",
                    middle: "中年期",
                    north: "北",
                    south: "南",
                    west: "西",
                },
                kanshi_detail: {
                    nikkanshi_detail:{
                        kanshi_detail:{
                            chishi:"",
                            kanshi_detail:"",
                            explanation:"",
                            kanshi:"",
                            kanshi_id:"",
                            tenchusatsu:"",
                            tenkan:"",
                            nickname:""

                        },
                        tenchusatsu_detail:[{
                            tenchusatsu_id:"" ,
                            tenchusatsu:"",
                            tenchusatsu_detail:""
                        }],
                        gou_detail:[{
                            gou_id:"",
                            gou:"",
                            gou_detail:""
                        }],
                        ijou_detail:[{
                            ijou_kanshi_id:"",
                            ijou_kanshi:"",
                            ijou_detail: "",
                            kanshi_id:""
                        }]
                    },
                    gekkanshi_detail:{
                        kanshi_detail:{
                            chishi:"",
                            kanshi_detail:"",
                            explanation:"",
                            kanshi:"",
                            kanshi_id:"",
                            tenchusatsu:"",
                            tenkan:"",
                            nickname:""
                        },
                        tenchusatsu_detail:[{
                            tenchusatsu_id:"" ,
                            tenchusatsu:"",
                            tenchusatsu_detail:""
                        }],
                        gou_detail:[{
                            gou_id:"",
                            gou:"",
                            gou_detail:""
                        }],
                        ijou_detail:[{
                            ijou_kanshi_id:"",
                            ijou_kanshi:"",
                            ijou_detail: "",
                            kanshi_id:""
                        }]
                    },
                    nenkanshi_detail:{
                        kanshi_detail:{
                            chishi:"",
                            kanshi_detail:"",
                            explanation:"",
                            kanshi:"",
                            kanshi_id:"",
                            tenchusatsu:"",
                            tenkan:"",
                            nickname:""
                        },
                        tenchusatsu_detail:[{
                            tenchusatsu_id:"" ,
                            tenchusatsu:"",
                            tenchusatsu_detail:""
                        }],
                        gou_detail:[{
                            gou_id:"",
                            gou:"",
                            gou_detail:""
                        }],
                        ijou_detail:[{
                            ijou_kanshi_id:"",
                            ijou_kanshi:"",
                            ijou_detail: "",
                            kanshi_id:""
                        }]
                    },
                },
                energy:[],
                kizuhou:[],
                hachimonhou:[],
                hachimon_type:"",
                hachimon_type_detail:"",

                action_area:{
                    nikkanshi_id :"",
                    gekkanshi_id : "",
                    nenkanshi_id :""
                },
                tenchusatsu_term:{
                    start_date_unix : "",
                    end_date_unix : "",
                },
                tenchusatsu_term_month:{
                    start_date_unix : "",
                    end_date_unix : "",
                }
            },
            individual_psychology:{
                honshitsu:"",
                honshitsu_detail:"",
                honshitsu_doubutsu:"",
                hyomen:"",
                ishi:"",
                kibou:"",
                mentality:"",
                mentality_detail:"",
                rhythm:"",
                rhythm_detail:"",
                thinking:"",
                thinking_detail:"",
                behavior:"",
                behavior_detail:"",
                rail:"",
                rail_keyword:"",
                rail_detail:"",
                honshitsu_doubutsu_group:"",
                hyomen_group:"",
                ishi_group:"",
                kibou_group:"",
                honshitsu_chara_name:"",
                hyomen_chara_name:"",
                ishi_chara_name:"",
                kibou_chara_name:"",
                honshitsu_keyword:"",
                parsonalstance:"",

            },
            isoho:{
                life_time:{},
                taiun:{},
                nenun:{},
                tsukiun:{},
                hiun:{}
            }
        },
        compatibilityResult:{
            first_parson:{
                profile:{
                    name:"",
                    birth_year:"",
                    birth_month:"",
                    birth_day:"",
                    birth_hour:"",
                    birth_minite:"",
                    gender:""
                },
                sanmei:{
                    insen: {
                        nikkan: "日干",
                        nisshi: "日支",
                        nikkanshizoukan1: "　",
                        nikkanshizoukan2: "　",
                        nikkanshizoukan3: "　",
                        gekkan:"月干",
                        gesshi:"月支",
                        gekkanshizoukan1:"　",
                        gekkanshizoukan2:"　",
                        gekkanshizoukan3: "　",
                        nenkan: "年干",
                        nenshi: "年支",
                        nenkanshizoukan1: "　",
                        nenkanshizoukan2:"　",
                        nenkanshizoukan3: "　",
                        nikkanshizoukanflg:"",
                        gekkanshizoukanflg :"",
                        nenkanshizoukanflg :""
                    },
                    yousen: {
                        bansei: "",
                        center: "中央",
                        east: "東",
                        first: "初年気",
                        last: "晩年気",
                        middle: "中年期",
                        north: "北",
                        south: "南",
                        west: "西",
                    },
                    kanshi_detail: {
                        nikkanshi_detail:{
                            kanshi_detail:{
                                chishi:"",
                                kanshi_detail:"",
                                explanation:"",
                                kanshi:"",
                                kanshi_id:"",
                                tenchusatsu:"",
                                tenkan:"",
                                nickname:""

                            },
                            tenchusatsu_detail:[{
                                tenchusatsu_id:"" ,
                                tenchusatsu:"",
                                tenchusatsu_detail:""
                            }],
                            gou_detail:[{
                                gou_id:"",
                                gou:"",
                                gou_detail:""
                            }],
                            ijou_detail:[{
                                ijou_kanshi_id:"",
                                ijou_kanshi:"",
                                ijou_detail: "",
                                kanshi_id:""
                            }]
                        },
                        gekkanshi_detail:{
                            kanshi_detail:{
                                chishi:"",
                                kanshi_detail:"",
                                explanation:"",
                                kanshi:"",
                                kanshi_id:"",
                                tenchusatsu:"",
                                tenkan:"",
                                nickname:""
                            },
                            tenchusatsu_detail:[{
                                tenchusatsu_id:"" ,
                                tenchusatsu:"",
                                tenchusatsu_detail:""
                            }],
                            gou_detail:[{
                                gou_id:"",
                                gou:"",
                                gou_detail:""
                            }],
                            ijou_detail:[{
                                ijou_kanshi_id:"",
                                ijou_kanshi:"",
                                ijou_detail: "",
                                kanshi_id:""
                            }]
                        },
                        nenkanshi_detail:{
                            kanshi_detail:{
                                chishi:"",
                                kanshi_detail:"",
                                explanation:"",
                                kanshi:"",
                                kanshi_id:"",
                                tenchusatsu:"",
                                tenkan:"",
                                nickname:""
                            },
                            tenchusatsu_detail:[{
                                tenchusatsu_id:"" ,
                                tenchusatsu:"",
                                tenchusatsu_detail:""
                            }],
                            gou_detail:[{
                                gou_id:"",
                                gou:"",
                                gou_detail:""
                            }],
                            ijou_detail:[{
                                ijou_kanshi_id:"",
                                ijou_kanshi:"",
                                ijou_detail: "",
                                kanshi_id:""
                            }]
                        },
                    },
                    energy:[],
                    kizuhou:[],
                    hachimonhou:[],
                    hachimon_type:"",
                    hachimon_type_detail:"",

                    action_area:{
                        nikkanshi_id :"",
                        gekkanshi_id : "",
                        nenkanshi_id :""
                    },
                    tenchusatsu_term:{
                        start_date_unix : "",
                        end_date_unix : "",
                    },
                    tenchusatsu_term_month:{
                        start_date_unix : "",
                        end_date_unix : "",
                    }
                }
            },
            second_parson:{
                profile:{
                    name:"",
                    birth_year:"",
                    birth_month:"",
                    birth_day:"",
                    birth_hour:"",
                    birth_minite:"",
                    gender:""
                },
                sanmei:{
                    insen: {
                        nikkan: "日干",
                        nisshi: "日支",
                        nikkanshizoukan1: "　",
                        nikkanshizoukan2: "　",
                        nikkanshizoukan3: "　",
                        gekkan:"月干",
                        gesshi:"月支",
                        gekkanshizoukan1:"　",
                        gekkanshizoukan2:"　",
                        gekkanshizoukan3: "　",
                        nenkan: "年干",
                        nenshi: "年支",
                        nenkanshizoukan1: "　",
                        nenkanshizoukan2:"　",
                        nenkanshizoukan3: "　",
                        nikkanshizoukanflg:"",
                        gekkanshizoukanflg :"",
                        nenkanshizoukanflg :""
                    },
                    yousen: {
                        bansei: "",
                        center: "中央",
                        east: "東",
                        first: "初年気",
                        last: "晩年気",
                        middle: "中年期",
                        north: "北",
                        south: "南",
                        west: "西",
                    },
                    kanshi_detail: {
                        nikkanshi_detail:{
                            kanshi_detail:{
                                chishi:"",
                                kanshi_detail:"",
                                explanation:"",
                                kanshi:"",
                                kanshi_id:"",
                                tenchusatsu:"",
                                tenkan:"",
                                nickname:""

                            },
                            tenchusatsu_detail:[{
                                tenchusatsu_id:"" ,
                                tenchusatsu:"",
                                tenchusatsu_detail:""
                            }],
                            gou_detail:[{
                                gou_id:"",
                                gou:"",
                                gou_detail:""
                            }],
                            ijou_detail:[{
                                ijou_kanshi_id:"",
                                ijou_kanshi:"",
                                ijou_detail: "",
                                kanshi_id:""
                            }]
                        },
                        gekkanshi_detail:{
                            kanshi_detail:{
                                chishi:"",
                                kanshi_detail:"",
                                explanation:"",
                                kanshi:"",
                                kanshi_id:"",
                                tenchusatsu:"",
                                tenkan:"",
                                nickname:""
                            },
                            tenchusatsu_detail:[{
                                tenchusatsu_id:"" ,
                                tenchusatsu:"",
                                tenchusatsu_detail:""
                            }],
                            gou_detail:[{
                                gou_id:"",
                                gou:"",
                                gou_detail:""
                            }],
                            ijou_detail:[{
                                ijou_kanshi_id:"",
                                ijou_kanshi:"",
                                ijou_detail: "",
                                kanshi_id:""
                            }]
                        },
                        nenkanshi_detail:{
                            kanshi_detail:{
                                chishi:"",
                                kanshi_detail:"",
                                explanation:"",
                                kanshi:"",
                                kanshi_id:"",
                                tenchusatsu:"",
                                tenkan:"",
                                nickname:""
                            },
                            tenchusatsu_detail:[{
                                tenchusatsu_id:"" ,
                                tenchusatsu:"",
                                tenchusatsu_detail:""
                            }],
                            gou_detail:[{
                                gou_id:"",
                                gou:"",
                                gou_detail:""
                            }],
                            ijou_detail:[{
                                ijou_kanshi_id:"",
                                ijou_kanshi:"",
                                ijou_detail: "",
                                kanshi_id:""
                            }]
                        },
                    },
                    energy:[],
                    kizuhou:[],
                    hachimonhou:[],
                    hachimon_type:"",
                    hachimon_type_detail:"",

                    action_area:{
                        nikkanshi_id :"",
                        gekkanshi_id : "",
                        nenkanshi_id :""
                    },
                    tenchusatsu_term:{
                        start_date_unix : "",
                        end_date_unix : "",
                    },
                    tenchusatsu_term_month:{
                        start_date_unix : "",
                        end_date_unix : "",
                    }
                },
            },
            compatibility_isou:{
                nikkanshi_nikkanshi :'',
                gekkanshi_nikkanshi :'',
                nenkanshi_nikkanshi :'',
                nikkanshi_gekkanshi :'',
                gekkanshi_gekkanshi :'',
                nenkanshi_gekkanshi :'',
                nikkanshi_nenkanshi :'',
                gekkanshi_nenkanshi :'',
                nenkanshi_nenkanshi :'',
            }
        }
    },
    reducers: {
        calc(state, getCalculation){
            state.result = getCalculation.payload;
            // console.log(state.result)
        },
        isouMonth(state, tsukiun){
            const newState={...state};
            newState.result.isoho.tsukiun = tsukiun.payload;
        },
        isouDay(state, hiun){
            const newState={...state};
            newState.result.isoho.hiun = hiun.payload;
        },
        compatibilityResult(state, payload){
            const newState={...state};
            newState.compatibilityResult = payload.payload;
            return newState;
        }
    }
})

const { calc, isouMonth, isouDay, compatibilityResult} = calculation.actions;

const getCalculationResultFromApi = (appraisedParson) => {
    return  async (dispatch) => {
        const res = await calculationAtApi(appraisedParson);
        dispatch(calc(res));
    }
  }

const getCalcIsouMonthFromApi = (kanshiNo, subYear) =>{
    return async(dispatch) => {
        // console.log(kanshiNo);
        // console.log(subYear);
        const res =await calcIsouMonthAtApi(kanshiNo, subYear);
        // console.log(res);
        dispatch(isouMonth(res));
    }
}
const getCalcIsouDayFromApi = (kanshiNo, subYear, subMonth) =>{
    return async(dispatch) => {
        // console.log(kanshiNo);
        // console.log(subYear);
        const res =await calcIsouDayAtApi(kanshiNo, subYear, subMonth);
        // console.log(res);
        dispatch(isouDay(res));
    }
}
const getCompatibilityResultFromApi = (parsons) =>{
    return async(dispatch) => {
        console.log('store/module/Calculation');
        const res = await getCompatibilityResultAtApi(parsons)
        dispatch(compatibilityResult(res))
    }
}

export { calculation, getCalculationResultFromApi, getCalcIsouMonthFromApi, getCalcIsouDayFromApi, getCompatibilityResultFromApi};
export default calculation.reducer;
