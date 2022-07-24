import { 
    PRODUCT_LIST_ERROR, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST
 } from "../constants/productConstant";
import { getProducts } from "../functions/product.function";

export const getProductAction = (page = 1, limit = 10) => async (dispatch, getState) => {
    try{
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
        const {data} = await getProducts(page, limit);    
        if(page > 1) {
            data.data = [
                ...getState().productList.list.data, 
                ...data.data,
            ]
        }
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PRODUCT_LIST_ERROR,
            payload:err.response,
        })
    }
}