import axios from "axios";
import axiosClient from "./BaseApiService";

const ENDPOINTS = {
    INCIDENTS: '/Incidenti',
    WORK_REQUESTS: '/NaloziRadaSort',
    CALLS: '/Pozivi',
    CALLS_SORT: '/PoziviSort',
    EQUIPMENT : '/Oprema',
    RESOLUTIONS: '/Resolutions',
    ONE_INCIDENT: '/SingleIncident',
    NOTIFICATIONS: '/Poruka',
    INCIDENTI_SORT: '/IncidentiSort',
    SAFETY_DOCS: '/SafetyDocumentsSort',
    WORK_PLANS: '/PlanoviRadaSort',
    CLANOVI: '/CrewMembers',
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

const postCall = async (payload) => {
    await axiosClient.post(ENDPOINTS.CALLS, payload)
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
    console.log(payload)
    try {
        await axiosClient.put(ENDPOINTS.INCIDENTS + `/${payload.ID}`,payload);
    }
    catch(error) {
        return null;
    }
}

const getAllNotifications = async() => {
    const response = await axiosClient.get(ENDPOINTS.NOTIFICATIONS + '?mode=all')
    return response.data;
}

const getUnreadNotifications = async() => {
    const response = await axiosClient.get(ENDPOINTS.NOTIFICATIONS + '?mode=unread')
    return response.data;
}

const getNotificationType = async (type) => {
    let response;
    switch(type){
        case 'Error' : response = await axiosClient.get(ENDPOINTS.NOTIFICATIONS + '?tip=0'); break;
        case 'Information' : response = await axiosClient.get(ENDPOINTS.NOTIFICATIONS + '?tip=2'); break;
        case 'Success' : response = await axiosClient.get(ENDPOINTS.NOTIFICATIONS + '?tip=3'); break;
        case 'Warning' : response = await axiosClient.get(ENDPOINTS.NOTIFICATIONS + '?tip=1'); break;
        default: return undefined;
    }
    return response.data;
}

const addNotification = async (payload) => {
    await axiosClient.post(ENDPOINTS.NOTIFICATIONS,payload);
}

const sortIncidents = async (payload) => {
    const results = await axiosClient.get(ENDPOINTS.INCIDENTI_SORT + `?columnName=${payload}`)
    return results.data;
}

const markNotificationsRead = async (payload) => {
    axiosClient.put(ENDPOINTS.NOTIFICATIONS,payload);
}

const getCrewForIncident = async (payload) => {
    try {
        const response = await axiosClient.get(ENDPOINTS.CREWS + `?incId=${payload}`);
        return response.data;
    }
    catch(error) {
        return null;
    }
}

const assignCrewToIncident = async (payload) => {
    try {
        await axiosClient.post(ENDPOINTS.CREWS,payload);
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
    getPozivi,
    getMyIncidents,
    addNewIncident,
    getOprema,
    postOprema,
    postResolution,
    getLocationCoordinates,
    getPoziviForIncident,
    postCall,
    getCoordinatesByAddress,
    getAllOprema,
    getIncidentById,
    getResolutionForIncident,
    updateIncident,
    getAllNotifications,
    getUnreadNotifications,
    getNotificationType,
    addNotification,
    sortIncidents,
    markNotificationsRead,
    getCrewForIncident,
    assignCrewToIncident,
    deleteDevice,
    assignUserToCrew,
}

export default incidentService;