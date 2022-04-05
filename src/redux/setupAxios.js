import axios from "axios";
import UserSlice from "./userSlice";

const BASE_URL = "http://localhost:5000"
const baseRequest = axios.create({
    baseURL: BASE_URL
})