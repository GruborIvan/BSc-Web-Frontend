import { call, put, takeLatest } from "redux-saga/effects";
import { GET_INCIDENTS, GET_WORK_REQUESTS } from "../../constants/action-types";
import incidentService from '../../services/IncidentService';
import { SaveIncidentsToBase, SaveWorkRequests } from "../actions";

function* getIncidents() {
    const response =  yield call(incidentService.getIncidents)
    console.log(response);
    yield put(SaveIncidentsToBase(response))
}

function* GetWorkRequests() {
    const response = yield call(incidentService.getWorkRequests);
    yield put(SaveWorkRequests(response))
}

export default function* incidentSaga() {
    yield takeLatest(GET_INCIDENTS,getIncidents)
    yield takeLatest(GET_WORK_REQUESTS,GetWorkRequests)
}