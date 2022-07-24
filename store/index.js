import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userCurrentReducer, userRegisterReducer } from "./../reducers/user.reducer"
import { productListReducer } from "./../reducers/product.reducer"
import { mytransactionReducer } from "./../reducers/transaction.reducer"

const reducers = combineReducers({
    userLogin: userLoginReducer,
    userCurrent :userCurrentReducer,
    userRegister: userRegisterReducer,
    productList: productListReducer,
    mytransaction: mytransactionReducer,
});
const storageUserToken = typeof window !== 'undefined' &&
    localStorage.getItem("token") ?  localStorage.getItem("token") : "";

const initialStore = {
    userLogin: {
        token: storageUserToken,
    },
    userCurrent: {
        loading: true,
    }
};

const middleware = [
    thunk
];

export const store = createStore(reducers, initialStore, composeWithDevTools(applyMiddleware(...middleware)));
