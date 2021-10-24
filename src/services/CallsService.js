import axiosClient from "./BaseApiService";

const ENDPOINTS = {
    CALLS: '/Pozivi',
    CALLS_SORT: '/PoziviSort',
}

const getPozivi = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.CALLS_SORT + '?columnName=' + payload);
        return response.data
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const getPoziviForIncident = async (incidentId) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.CALLS + `?incidentId=${incidentId}`);
        return response.data
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const postCall = async (payload) => {
    await axiosClient.post(ENDPOINTS.CALLS, payload)
}

const callsService = {
    getPozivi,
    getPoziviForIncident,
    postCall,
}

export default callsService;