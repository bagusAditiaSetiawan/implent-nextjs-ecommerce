import { 
    TRANSACTION_MY_ERROR,
    TRANSACTION_MY_SUCCESS,
    TRANSACTION_MY_REQUEST
 } from "../constants/transactionConstant";

export const mytransactionReducer = (state={}, action)=>{
    switch(action.type){
        case TRANSACTION_MY_REQUEST:{
            return {
                ...state,
                loading:true,           
                error: false,
            }
        }
        case TRANSACTION_MY_SUCCESS:{
            return {
                loading:false,
                list:action.payload,                
                error: false,
            }
        }
        case TRANSACTION_MY_ERROR:{
            return {
                loading:false,
                error:action.payload
            }
        }
        default:{
            return state;
        }
    }
}

