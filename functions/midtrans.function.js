import {httpRequest} from "../utility/axios/httpRequest";


export const transactionPg = async (transaction = {
      transaction_details_gross_amount,
      customer_details_name,
      customer_details_email,
      customer_details_phone,
    }) => {
    return await httpRequest(true).post("/pg/transactions", {...transaction});
}
