import {httpRequest} from "../utility/axios/httpRequest";


export const getMyTransaction = async () => {
    return await httpRequest(true).get(`/transactions/mytransaction`);
}


export const getMyTransactionById = async (id) => {
    return await httpRequest(true).get(`/transactions/${id}`);
}