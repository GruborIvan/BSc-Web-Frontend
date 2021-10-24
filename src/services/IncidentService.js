import axios from "axios";
import axiosClient from "./BaseApiService";

const ENDPOINTS = {
    INCIDENTS: '/Incidenti',
    WORK_REQUESTS: '/NaloziRadaSort',
    EQUIPMENT : '/Oprema',
    RESOLUTIONS: '/Resolutions',
    ONE_INCIDENT: '/SingleIncident',
    INCIDENTI_SORT: '/IncidentiSort',
    SAFETY_DOCS: '/SafetyDocumentsSort',
    WORK_PLANS: '/PlanoviRadaSort',
}

const getIncidents = async () => {
    try {
        const incidents = await axiosClient.get(ENDPOINTS.INCIDENTS);
        return incidents.data;
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const getMyIncidents = async (username) => {
    try {
        const incidents = await axiosClient.get(ENDPOINTS.INCIDENTS + `?username=${username}`);
        return incidents.data;
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const getIncidentById = async (incidentId) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.INCIDENTS + `?incidentId=${incidentId}`)
        return response.data
    }
    catch(error) {

    }
    
}

const addNewIncident = async(payload) => {
    try {
        await axiosClient.post(ENDPOINTS.INCIDENTS, payload)
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const getOprema = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.EQUIPMENT + `?incId=${payload}`);
        return response.data
    }
    catch(error) {
        alert('Fetch error! Please try again!')
        return undefined
    }
}

const postOprema = async (payload) => {
    try {
        await axiosClient.post(ENDPOINTS.EQUIPMENT,payload)
    }
    catch(error) {
        alert('Post error! Please try again!')
        return undefined
    }
}

const getLocationCoordinates = async (payload) => {

    try {
        await axios.get("https://geocode-maps.yandex.ru/1.x/?apikey=1cdda24c-aedc-4883-8d49-60b9dec638a2&geocode=Tverskaya+6")
    }
    catch(error) {
        alert('Post error! Please try again!')
        return undefined
    }
}

const postResolution = async ({payload}) => {
    await axiosClient.post(ENDPOINTS.RESOLUTIONS, payload)
}

const getCoordinatesByAddress = async(payload) => {
    const address = payload.address.replace(' ','+')
    const fullAddress = payload.number + '+' + address;
    const brt = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=AIzaSyACJqGcEMIw0d1nGS2_rVCCMsvlQVs8gig`)
    return brt.data.results[0].geometry.location
}

const getAllOprema = async () => {
    const oprema = await axiosClient.get(ENDPOINTS.EQUIPMENT);
    return oprema.data;
}

const getResolutionForIncident = async(incidentId) => {
    try {
        const result = await axiosClient.get(ENDPOINTS.RESOLUTIONS + `?IncidentId=${incidentId}`);
        return result.data;
    }
    catch(error) {
        return null;
    }
} 

const updateIncident = async(payload) => {
    try {
        await axiosClient.put(ENDPOINTS.INCIDENTS + `/${payload.ID}`,payload);
    }
    catch(error) {
        return null;
    }
}

const sortIncidents = async (payload) => {
    const results = await axiosClient.get(ENDPOINTS.INCIDENTI_SORT + `?columnName=${payload}`)
    return results.data;
}

const getCrewForIncident = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.ONE_INCIDENT + `?incidentId=${payload}`);
        return response.data;
    }
    catch(error) {
        return null;
    }
}

const assignCrewToIncident = async (payload) => {
    try {
        await axiosClient.put(ENDPOINTS.ONE_INCIDENT,payload);
    }
    catch(error) {
        return null;
    }
}

const deleteDevice = async (payload) => {
    await axiosClient.delete(ENDPOINTS.EQUIPMENT + `/${payload}`);
}

const assignUserToCrew = async (payload) => {
    await axiosClient.post(ENDPOINTS.CLANOVI,payload)
}

const incidentService = {
    getIncidents,
    getMyIncidents,
    addNewIncident,
    getOprema,
    postOprema,
    postResolution,
    getLocationCoordinates,
    getCoordinatesByAddress,
    getAllOprema,
    getIncidentById,
    getResolutionForIncident,
    updateIncident,
    sortIncidents,
    getCrewForIncident,
    assignCrewToIncident,
    deleteDevice,
    assignUserToCrew,
}

export default incidentService;