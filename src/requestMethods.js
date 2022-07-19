import axios from "axios";

//const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/api/v1/";

console.log("Base", BASE_URL)

export const request = axios.create({
    baseURL: BASE_URL
});