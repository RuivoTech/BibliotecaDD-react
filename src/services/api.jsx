import axios from "axios";

const api = axios.create({
    baseURL: "http://api.ruivotech.com.br:3333"
});

export default api;