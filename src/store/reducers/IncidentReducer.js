import { DELETE_EDIT_INCIDENT, SAVE_CALLS, SAVE_CLANS, SAVE_CREWS, SAVE_CURRENT_CREW, SAVE_DASHBOARD_DATA, SAVE_DETAILS, SAVE_DEVICES, SAVE_INCIDENTS, SAVE_NOTIFICATIONS, SAVE_RESOLUTION_FOR_INCIDENT, SAVE_WORK_REQUESTS } from "../../constants/action-types"

const initialState = {
    incidents : [],
    Documents: [],
    calls: [],
    devices: [],
    editIncident: null,
    currentResolution: null,
    Notifications: [],
    Crews: [],
    CurrentCrew: null,
    ClanoviEkipe: [],
    Dashboard: null
}

export default function incident(state = initialState, action) {
    switch(action.type) {
        case SAVE_INCIDENTS: {
            return { ...state, incidents: action.payload };
        }
        case SAVE_WORK_REQUESTS: {
            return { ...state, Documents : action.payload };
        }
        case SAVE_CALLS: {
            return { ...state, calls: action.payload };
        }
        case SAVE_DEVICES: {
            return { ...state, devices: action.payload };
        }
        case SAVE_DETAILS: {
            return { ...state, editIncident: action.payload };
        }
        case DELETE_EDIT_INCIDENT: {
            return { ...state, editIncident: null }
        }
        case SAVE_RESOLUTION_FOR_INCIDENT: {
            return { ...state, currentResolution: action.payload }
        }
        case SAVE_NOTIFICATIONS: {
            return { ...state, Notifications: action.payload }
        }
        case SAVE_CREWS: {
            return { ...state, Crews: action.payload }
        }
        case SAVE_CURRENT_CREW: {
            return { ...state, CurrentCrew: action.payload }
        }
        case SAVE_CLANS : {
            return { ...state, ClanoviEkipe: action.payload }
        }
        case SAVE_DASHBOARD_DATA: {
            return { ...state, Dashboard: action.payload }
        }
        default: {
            return {...state}
        }
    }
}