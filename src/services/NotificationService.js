import axiosClient from "./BaseApiService";

const ENDPOINTS = {
    NOTIFICATIONS: '/Poruka',
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

const markNotificationsRead = async (payload) => {
    const response = await axiosClient.put(ENDPOINTS.NOTIFICATIONS,payload);
    console.log(response)
    return response.data;
}

const notificationService = {
    getAllNotifications,
    getUnreadNotifications,
    getNotificationType,
    addNotification,
    markNotificationsRead
}

export default notificationService;