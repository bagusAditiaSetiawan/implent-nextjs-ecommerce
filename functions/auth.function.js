import {httpRequest} from "../utility/axios/httpRequest";


export const login = async (email, password) => {
    return await httpRequest().post("/auth/signin", {email, password})
}

export const singUp = async (username, email, password) => {
    return await httpRequest().post("/auth/signup", {username, email, password})
}

export const signOut = async (email, password) => {
    return await httpRequest().post("/auth/signout", {email, password})
}


export const currentUser = async () => {
    return await httpRequest(true).get("/auth/current-user")
}
