import axios from "axios";

export const apiUser = axios.create({
    // baseURL: "https://tcc-senai-back.vercel.app"
    baseURL: "http://localhost:8080/"
})
