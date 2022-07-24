import { 
    LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS,
    REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_REQUEST, CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_ERROR
 } from "./../constants/userConstant";

export const userLoginReducer = (state={}, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:{
            return {
                ...state,
                loading:true,
            }
        }
        case LOGIN_SUCCESS:{
            return {
                loading:false,
                token:action.payload,                
                error: false,
            }
        }
        case LOGIN_ERROR:{
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        }
        default:{
            return state;
        }
    }
}


export const userRegisterReducer = (state={}, action)=>{
    switch(action.type){
        case REGISTER_REQUEST:{
            return {
                ...state,
                loading:true,
            }
        }
        case REGISTER_SUCCESS:{
            return {
                loading:false,
                user:action.payload,
                error: false,
            }
        }
        case REGISTER_ERROR:{
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        }
        default:{
            return state;
        }
    }
}

export const userCurrentReducer  = (state={}, action)=>{
    switch(action.type){
        case CURRENT_USER_REQUEST:{
            return {
                loading:true,
            }
        }
        case CURRENT_USER_SUCCESS:{
            return {
                loading:false,
                user:action.payload,
                error: false,
            }
        }
        case CURRENT_USER_ERROR:{
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