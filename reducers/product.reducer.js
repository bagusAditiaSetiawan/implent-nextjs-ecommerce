import { 
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
 } from "../constants/productConstant";

export const productListReducer = (state={}, action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:{
            return {
                ...state,
                loading:true,           
                error: false,
            }
        }
        case PRODUCT_LIST_SUCCESS:{
            return {
                loading:false,
                list:action.payload,                
                error: false,
            }
        }
        case PRODUCT_LIST_ERROR:{
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

