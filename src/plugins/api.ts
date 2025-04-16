import axios from "axios";

const baseURL: string = "http://localhost:8080/"

// const baseURL: string = "https://esa-blueshell.nl/api/"

const api = axios.create({
  baseURL
})


export default api;
