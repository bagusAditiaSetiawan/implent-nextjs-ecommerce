import { 
    LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS,
    REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS,
    CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_ERROR,
 } from "../constants/userConstant";
import { currentUser, login, singUp } from "../functions/auth.function";

export const logoutAction = () => async (dispatch, getState) => {
    dispatch({
        type:LOGIN_SUCCESS,
        payload:"",
    });
    dispatch({
        type:CURRENT_USER_SUCCESS,
        payload:"",
    });
    typeof window !== 'undefined' & localStorage.removeItem("token");
}

export const registerCleanupAction = ()=> async (dispatch, getState) => {
    dispatch({
        type:REGISTER_SUCCESS,
        payload:"",
    });
}

export const loginCleanupAction = ()=> async (dispatch, getState) => {
    dispatch({
        type:LOGIN_SUCCESS,
        payload:"",
    });
}


export const registerAction = (username, email, password) => async (dispatch) => {
    try{
        dispatch({
            type:REGISTER_REQUEST
        })
        const {data} = await singUp(username, email, password);      
        dispatch({
            type:REGISTER_SUCCESS,
            payload:data
        })
    }catch(err){
        dispatch({
            type:REGISTER_ERROR,
            payload:err.response,
        })
    }
}
export const userCurrentAction = () => async (dispatch) => {
    try{
        dispatch({
            type:CURRENT_USER_REQUEST
        })
        const {data} = await currentUser();
        dispatch({
            type:CURRENT_USER_SUCCESS,
            payload:data
        })
    }catch(err){
        console.log(err);
        dispatch({
            type:CURRENT_USER_ERROR,
            payload:err.response,
        })
    }
}

export const loginAction = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type:LOGIN_REQUEST
        })
        const {data} = await login(email, password);          
        localStorage.setItem('token', data.access_token);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })
    }catch(err){
        console.log(err);
        dispatch({
            type:LOGIN_ERROR,
            payload:err.response,
        })
    }
}