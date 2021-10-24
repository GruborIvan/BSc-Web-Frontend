import { call, put, select, takeLatest } from "redux-saga/effects";
import { ADD_CALL, ADD_DEVICE, ADD_INCIDENT, ADD_NOTIFICATION, ADD_RESOLUTION, ASSIGN_CREW, ASSIGN_USER_TO_CREW, DELETE_DEVICE, GET_ALL_DEVICES, GET_CALLS, GET_CREWS, GET_CURRENT_CREW, GET_DEVICES, GET_INCIDENTS, GET_NOTIFICATIONS, GET_RESOLUTION_FOR_INCIDENT, MARK_NOTIFICATIONS_READ, SAVE_BASIC_INFO, SAVE_EDIT_INCIDENT, SORT_INCIDENTS } from "../../constants/action-types";
import incidentService from '../../services/IncidentService';
import { SaveCalls, SaveClans, SaveCrews, SaveCurrentCrew, SaveCurrentIncidentToRedux, SaveDevices, SaveIncidentsToBase, SaveNotifications, SaveResolution } from "../actions";
import { loggedUserSelector } from "../selectors/AuthSelector";
import makeid from '../../constants/RandomGenerator';
import authService from "../../services/AuthService";

function* getIncidents({payload}) {
    let response;
    if (payload === 'all') {
        response =  yield call(incidentService.getIncidents)
    }
    else {
        const user = yield select(loggedUserSelector)
        response = yield call(incidentService.getMyIncidents,user.Username)
    }
    yield put(SaveIncidentsToBase(response))
}

function* GetCalls({incident}) {
    let response;
    if (incident === 'Razlog' || incident === 'Kvar' || incident === 'UsernameKor' || incident === 'IncidentId') {
        response = yield call(incidentService.getPozivi,incident);
    }
    else {
        response = yield call(incidentService.getPoziviForIncident,incident);
    }
    yield put(SaveCalls(response));
}

function* AddIncident(payload) {
    if (payload.addupd === "ADD") {
        yield call(incidentService.addNewIncident,payload.payload);
        const notification = { IdPoruke: 'NOT_' + makeid(6), IdKorisnika: 'admin@app.com', Sadrzaj: 'A new incident has been added to the system', Tip: 2, Procitana : false, Timestamp: '2021-07-22T00:00:00'}
        yield call(incidentService.addNotification,notification);
    }
    else {
        yield call(incidentService.updateIncident,payload.payload);
    }
}

function* getDevices({payload}) {
    const response = yield call(incidentService.getOprema,payload)
    yield put(SaveDevices(response))
}

function* addDevice({payload}) {
    try {
        const address = { address: payload.Address, number: payload.Number }
        const coords = yield call(incidentService.getCoordinatesByAddress,address)
        const data = { IdOprema: payload.IdOprema, Name: payload.Name, OpremaType: payload.OpremaType, CoordinateX: coords.lat, CoordinateY: coords.lng, IncidentId: payload.IncidentId, Address: payload.Address + " " + payload.Number }
        yield call(incidentService.postOprema,data)
        const response = yield call(incidentService.getOprema,payload.IncidentId)
        yield put(SaveDevices(response))
    }
    catch(error) {
        alert("Couldn't find address" + payload.Address + " " + payload.Number)
    }
}

function* addResolution(payload) {
    console.log(payload.payload.IncidentId)
    yield call(incidentService.postResolution,payload)
    const resolution = yield call(incidentService.getResolutionForIncident,payload.payload.IncidentId);
    console.log(resolution);
    yield put(SaveResolution(resolution));
}

function* addCall({payload}) {
    console.log(payload.IncidentId)
    yield call(incidentService.postCall,payload)
    const result = yield call(incidentService.getPoziviForIncident,payload.IncidentId);
    yield put(SaveCalls(result));
}

function* getAllDevices() {
    const response = yield call(incidentService.getAllOprema)
    yield put(SaveDevices(response))
}

function* getIncidentById({payload}) {
    const incident = yield call(incidentService.getIncidentById,payload);
    yield put(SaveCurrentIncidentToRedux(incident));
}

function* getResolution({payload}) {
    try {
        const result = yield call(incidentService.getResolutionForIncident,payload)
        yield put(SaveResolution(result));
    }
    catch(error) {  }
}

function* getNotifications({ payload }) {
    let response;
    if (payload === 'all') {
        response = yield call(incidentService.getAllNotifications)

    }
    else if (payload === 'unread') {
        response = yield call(incidentService.getUnreadNotifications)
    }
    else {
        response = yield call(incidentService.getNotificationType,payload)
    }
    yield put(SaveNotifications(response));
}

function* addNotification({ payload }) {
    yield call(incidentService.addNotification,payload)
}

function* sortIncidents({ payload }) {
    const results = yield call(incidentService.sortIncidents,payload)
    yield put(SaveIncidentsToBase(results));
}

function* markNotificationAsRead({ payload }) {
    yield call(incidentService.markNotificationsRead,payload);
}

function* getCrews() {
    const response = yield call(authService.getCrews);
    yield put(SaveCrews(response));
}

function* getCurrentCrew({ payload }) {
    const response = yield call(incidentService.getCrewForIncident,payload);
    yield put(SaveCurrentCrew(response));
}

function* assignCrewToIncident({ payload }) {
    yield call(incidentService.assignCrewToIncident,payload);
    const response = yield call(incidentService.getCrewForIncident,payload.IncidentId);
    yield put(SaveCurrentCrew(response));
}

function* deleteDevice({ payload }) {
    yield call(incidentService.deleteDevice,payload.device)
    const response = yield call(incidentService.getOprema,payload.incident)
    yield put(SaveDevices(response))
}

function* assignUserToCrew({ payload }) {
    yield call(incidentService.assignUserToCrew,payload)
    const response = yield call(incidentService.getClans);
    yield put(SaveClans(response));
}

function* saveIncidentBasicInfo({ payload }) {
    console.log('SAGA')
    console.log(payload)
    console.log('SAGA')
    yield put(SaveCurrentIncidentToRedux(payload));
}


export default function* incidentSaga() {
    yield takeLatest(GET_INCIDENTS,getIncidents)
    yield takeLatest(GET_CALLS,GetCalls)
    yield takeLatest(ADD_INCIDENT, AddIncident)
    yield takeLatest(GET_DEVICES, getDevices)
    yield takeLatest(ADD_DEVICE, addDevice)
    yield takeLatest(ADD_RESOLUTION, addResolution)
    yield takeLatest(ADD_CALL, addCall)
    yield takeLatest(GET_ALL_DEVICES,getAllDevices)
    yield takeLatest(SAVE_EDIT_INCIDENT, getIncidentById)
    yield takeLatest(GET_RESOLUTION_FOR_INCIDENT, getResolution)
    yield takeLatest(GET_NOTIFICATIONS, getNotifications)
    yield takeLatest(ADD_NOTIFICATION, addNotification)
    yield takeLatest(SORT_INCIDENTS, sortIncidents)
    yield takeLatest(MARK_NOTIFICATIONS_READ, markNotificationAsRead)
    yield takeLatest(GET_CREWS, getCrews)
    yield takeLatest(GET_CURRENT_CREW, getCurrentCrew)
    yield takeLatest(ASSIGN_CREW, assignCrewToIncident)
    yield takeLatest(DELETE_DEVICE, deleteDevice)
    yield takeLatest(ASSIGN_USER_TO_CREW, assignUserToCrew)
    yield takeLatest(SAVE_BASIC_INFO, saveIncidentBasicInfo)
}