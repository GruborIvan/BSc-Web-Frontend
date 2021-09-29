import { ADD_CALL, ADD_DEVICE, ADD_EXTERNAL_LOGIN, ADD_INCIDENT, ADD_NOTIFICATION, ADD_RESOLUTION, APPROVE_USER, ASSIGN_CREW, ASSIGN_USER_TO_CREW, CHANGE_PASSWORD, DELETE_DEVICE, DELETE_EDIT_INCIDENT, GET_ALL_DEVICES, GET_CALLS, GET_CLANS, GET_COORDINATES, GET_CREWS, GET_CURRENT_CREW, GET_DEVICES, GET_INCIDENTS, GET_NOTIFICATIONS, GET_RESOLUTION_FOR_INCIDENT, GET_UNAPPROVED_USERS, GET_USER_INFO, GET_WORK_REQUESTS, LOGIN, LOGOUT, MARK_NOTIFICATIONS_READ, REFRESH_TOKEN, REGISTER, REMOVE_CURRENT_LOGGED, SAVE_BASIC_INFO, SAVE_CALLS, SAVE_CLANS, SAVE_CREWS, SAVE_CURRENT_CREW, SAVE_CURRENT_LOGGED, SAVE_DETAILS, SAVE_DEVICES, SAVE_EDIT_INCIDENT, SAVE_INCIDENTS, SAVE_NOTIFICATIONS, SAVE_RESOLUTION_FOR_INCIDENT, SAVE_TOKEN, SAVE_UNAPPROVED_USERS, SAVE_WORK_REQUESTS, SORT_INCIDENTS, UPDATE_USER } from '../../constants/action-types'

export const RegisterUser = (payload) => {
    return { type: REGISTER, payload: payload }
}

export const LoginUser = (payload) => {
    return { type: LOGIN, payload: payload }
}

export const AddExternalLogin = (payload) => {
    return { type: ADD_EXTERNAL_LOGIN, payload: payload }
}

export const SaveToken = (token) => {
    return { type: SAVE_TOKEN, payload: token }
}

export const getUserInfo = (username) => {
    return { type: GET_USER_INFO, payload: username }
}

export const LogoutUser = () => {
    return { type: LOGOUT }
}

export const RefreshToken = () => {
    return { type: REFRESH_TOKEN }
}

export const GetIncidents = (gettype) => {
    return { type: GET_INCIDENTS, payload: gettype }
}

export const SaveIncidentsToBase = (payload) => {
    return { type: SAVE_INCIDENTS, payload: payload}
}

export const AddNewIncident = (payload, addupd) => {
    return { type: ADD_INCIDENT, payload: payload, addupd: addupd }
}

export const SaveCurrentlyLogged = (payload) => {
    return { type: SAVE_CURRENT_LOGGED, payload: payload }
}

export const RemoveCurrentlyLogged = () => {
    return { type: REMOVE_CURRENT_LOGGED }
}

export const GetCalls = (incId) => {
    return { type: GET_CALLS, incident: incId }
}

export const SaveCalls = (payload) => {
    return { type: SAVE_CALLS, payload: payload }
}

export const AddCall = (payload) => {
    return { type: ADD_CALL, payload: payload }
}

export const GetUnapprovedUsers = () => {
    return { type: GET_UNAPPROVED_USERS }
}

export const SaveUnapprovedUsers = (payload) => {
    return { type: SAVE_UNAPPROVED_USERS, payload: payload }
}

export const ApproveUser = (payload) => {
    return { type: APPROVE_USER, payload: payload }
}

export const GetDevices = (payload) => {
    return { type: GET_DEVICES, payload: payload }
}

export const SaveDevices = (payload) => {
    return { type: SAVE_DEVICES, payload: payload }
}

export const AddNewDevice = (payload) => {
    return { type: ADD_DEVICE, payload: payload }
}

export const AddNewResolution = (payload) => {
    return { type: ADD_RESOLUTION, payload: payload }
}

export const GetCoordinates = (payload) => {
    return { type: GET_COORDINATES, payload: payload }
}

export const ChangePassword = (payload) => {
    return { type: CHANGE_PASSWORD, payload: payload }
}

export const GetAllDevices = () => {
    return { type: GET_ALL_DEVICES }
}

export const SaveEditIncident = (incidentId) => {
    return { type: SAVE_EDIT_INCIDENT, payload: incidentId }
}

export const SaveBasicInfo = (incident) => {
    return { type: SAVE_BASIC_INFO, payload: incident }
}

export const DeleteEditIncident = () => {
    return { type: DELETE_EDIT_INCIDENT }
}

export const SaveCurrentIncidentToRedux = (payload) => {
    return { type: SAVE_DETAILS, payload: payload }
}

export const GetResolution = (payload) => {
    return { type: GET_RESOLUTION_FOR_INCIDENT, payload: payload }
}

export const SaveResolution = (payload) => {
    return { type: SAVE_RESOLUTION_FOR_INCIDENT, payload: payload }
}

export const GetNotifications = (payload) => {
    return { type: GET_NOTIFICATIONS, payload: payload }
}

export const SaveNotifications = (payload) => {
    return { type: SAVE_NOTIFICATIONS, payload: payload }
}

export const AddNotification = (payload) => {
    return { type: ADD_NOTIFICATION, payload: payload }
}

export const SortIncidents = (payload) => {
    return { type: SORT_INCIDENTS, payload: payload }
}

export const UpdateUser = (payload) => {
    return { type: UPDATE_USER, payload: payload }
}

export const markNotificationAsRead = (payload) => {
    return { type: MARK_NOTIFICATIONS_READ, payload: payload }
}

export const GetCrews = () => {
    return { type: GET_CREWS }
}

export const SaveCrews = (payload) => {
    return { type: SAVE_CREWS, payload: payload }
}

export const GetCrewForIncident = (payload) => {
    return { type: GET_CURRENT_CREW, payload: payload }
}

export const SaveCurrentCrew = (payload) => {
    return { type: SAVE_CURRENT_CREW, payload: payload }
}

export const AssignCrew = (payload) => {
    return { type: ASSIGN_CREW, payload: payload }
}

export const GetWorkRequests = (payload) => {
    return { type: GET_WORK_REQUESTS, payload: payload }
}

export const SaveWorkRequests = (payload) => {
    return { type: SAVE_WORK_REQUESTS, payload: payload }
}

export const DeleteDevice = (payload) => {
    return { type: DELETE_DEVICE, payload: payload }
}

export const GetClans = () => {
    return { type: GET_CLANS }
}

export const SaveClans = (payload) => {
    return { type: SAVE_CLANS, payload: payload }
}

export const AssignUserToCrew = (payload) => {
    return { type: ASSIGN_USER_TO_CREW, payload: payload }
}