import {httpRequest} from "../utility/axios/httpRequest";


export const getMyTransaction = async (page = 1, limit = 10) => {
    return await httpRequest(true).get(`/transactions/mytransaction?page=${page}&limit=${limit}&sort=DESC`);
}


export const getMyTransactionById = async (id) => {
    return await httpRequest(true).get(`/transactions/${id}`);
}