import axios from 'axios'

const BASE_URL = 'http://172.21.96.1:8001/api';

export default axios.create({
    baseURL : BASE_URL,
    headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'content-type': 'application/json'
    }
})