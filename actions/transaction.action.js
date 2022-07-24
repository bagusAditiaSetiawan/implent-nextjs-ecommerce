import { 
    TRANSACTION_MY_ERROR, TRANSACTION_MY_REQUEST, TRANSACTION_MY_SUCCESS
 } from "../constants/transactionConstant";
import { getMyTransaction } from "../functions/transactions.function";

export const getMyTransactionAction = (page = 1, limit = 10) => async (dispatch, getState) => {
    try{
        dispatch({
            type:TRANSACTION_MY_REQUEST
        })
        const {data} = await getMyTransaction(page, limit);    
        if(page > 1) {
            data.data = [
                ...getState().mytransaction.list.data, 
                ...data.data,
            ]
        }
        dispatch({
            type:TRANSACTION_MY_SUCCESS,
            payload:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:TRANSACTION_MY_ERROR,
            payload:err.response,
        })
    }
}