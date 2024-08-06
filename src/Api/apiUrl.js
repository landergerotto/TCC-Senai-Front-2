import axios from "axios";

export const apiUrl = axios.create({
    baseURL: "https://tcc-senai-back.vercel.app"
})
