import {httpRequest} from "../utility/axios/httpRequest";

export async function getDetailProduct(id ) {
    try{
        const res = await httpRequest(false).get(`/product-items/${id}`);
        return res.data;
    }catch (e) {
        console.log(e)
    }
}

export async function getProducts(page = 1, limit = 10) {
    try{
        const res = await httpRequest(false).get(`/product-items?limit=${limit}&page=${page}&sort=DESC`);
        return res.data;
    }catch (e) {
        console.log(e)
    }
}