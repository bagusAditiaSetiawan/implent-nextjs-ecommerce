import {httpRequest} from "../utility/axios/httpRequest";


export const addToCart = async (id) => {
    return await httpRequest(true).post(`/carts/add/${id}`)
}