import axios from "axios";
import {baseApi} from "../../config";

function getToken() {
    return localStorage.getItem('token');
}


export function httpRequest(bearer = false) {
   const options = {
       baseURL: baseApi,
   };
    if(bearer) {
        options.headers = {
            Authorization: `Bearer ${getToken()}`,
        }
    }
    return axios.create(options);
}