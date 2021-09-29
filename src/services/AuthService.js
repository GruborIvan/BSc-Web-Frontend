import axios from 'axios'
import qs from 'qs'

const BASE_URL = 'http://localhost:8000';
const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }

const ENDPOINTS = {
    LOGIN: '/Token',
    REGISTER: '/api/Account/Register',
    REFRESH: '/token/refresh',
    USER_INFO : '/api/UserInfo',
    CHANGE_PASS: '/api/Account/ChangePassword',
}

const registerNewUser = async (payload) => {
    const response = await axios.post(BASE_URL + ENDPOINTS.REGISTER, payload);
    if (response.status !== 200) {
        alert("Error while registering new user!");
    }
}

const registerUserInfo = async (payload) => {
    try {
        await axios.post(BASE_URL + ENDPOINTS.USER_INFO, payload);
    }
    catch(error) {  }
}

const loginUser = async (payload) => {
    const data = qs.stringify(payload);
    try {
        const response = await axios.post(BASE_URL + ENDPOINTS.LOGIN,data,headers);
        if (response.status === 200) {
            localStorage.setItem('token',response.data.access_token)
            return response.data.access_token
        }
    }
    catch(error) {
        alert('Login error! Please try again with a different username/password combination!')
        return undefined
    }
}

const fetchAdditionalUserData = async(username) => {
    try {
        const response = await axios.get(`${BASE_URL}/${ENDPOINTS.USER_INFO}?username=${username}`)
        if (response.status === 401) {
            alert('Ovaj nalog jos uvek nije odobren, ceka se odobrenje od strane administratora!')
        }
        else {
            return response.data;
        }
    }
    catch(error) {
        if (error.response.status === 401) {
            alert('Your account has to be approved by administrator!');
        }
        else if (error.response.status === 404) {
            alert('Invalid username/password combination \n Register to continue..');
        }
        return undefined;
    }
}

const getUnapprovedUsers = async() => {
    try {
        return (await axios.get(`${BASE_URL}/${ENDPOINTS.USER_INFO}`)).data
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const approveUser = async(payload) => {
    try {
        await axios.post(`${BASE_URL}/${ENDPOINTS.USER_INFO}?username=${payload.username}&val=${payload.val}`)
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const changePass = async(payload) => {
    // :D
    alert('Password successfully changed!')
}

const updateLoggedInUser = async(payload) => {
    await axios.put(BASE_URL + ENDPOINTS.USER_INFO,payload);
}

const authService = {
    registerNewUser,
    loginUser,
    registerUserInfo,
    fetchAdditionalUserData,
    getUnapprovedUsers,
    approveUser,
    changePass,
    updateLoggedInUser,
}

export default authService;