import {httpRequest} from "../utility/axios/httpRequest";


export const getProvinces = async () => {
    return await httpRequest().get("/rajaongkir/provinces")
}

export const getCities = async (provinceId) => {
    return await httpRequest().get(`/rajaongkir/cities?province_id=${provinceId}`)
}
export const getCouriers = async () => {
    return await httpRequest().get(`/rajaongkir/couriers`)
}

export const getCost = async (form = {origin,destination,courier,weight}) => {
    return await httpRequest().post(`/rajaongkir/cost`, {
        ...form
    })
}
