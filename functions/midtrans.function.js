import {httpRequest} from "../utility/axios/httpRequest";


export const transactionPg = async (transaction) => {
    console.log(transactionPg);
    return await httpRequest(true).post("/transactions/checkout", {...transaction});
}

export const methods = async (transaction) => {
  return await httpRequest(false).get(`/paymentgateway/method?type=${transaction}`);
}
