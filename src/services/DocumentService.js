import axiosClient from "./BaseApiService";

const ENDPOINTS = {
    WORK_REQUESTS : '/NaloziRada',
    WORK_PLANS : '/PlanoviRada',
    SAFETY_DOCS : '/SafetyDocuments'
}

const getWorkRequests = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.WORK_REQUESTS + `?columnName=${payload}`);
        return response.data;
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const getWorkPlans = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.WORK_PLANS  + `?columnName=${payload}`);
        return response.data;
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}   

const getSafetyDocuments = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.SAFETY_DOCS + `?columnName=${payload}`);
        return response.data;
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const documentService = {
    getWorkRequests,
    getWorkPlans,
    getSafetyDocuments
}

export default documentService;