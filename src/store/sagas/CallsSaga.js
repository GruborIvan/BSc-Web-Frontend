import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_CALL, GET_CALLS } from "../../constants/action-types";
import callsService from "../../services/CallsService";
import { SaveCalls } from "../actions";

function* GetCalls({incident}) {
    let response;
    if (incident === 'Razlog' || incident === 'Kvar' || incident === 'UsernameKor' || incident === 'IncidentId') {
        response = yield call(callsService.getPozivi,incident);
    }
    else {
        response = yield call(callsService.getPoziviForIncident,incident);
    }
    yield put(SaveCalls(response));
}

function* addCall({payload}) {
    yield call(callsService.postCall,payload)
    const result = yield call(callsService.getPoziviForIncident,payload.IncidentId);
    yield put(SaveCalls(result));
}

export default function* callsSaga() {
    yield takeLatest(GET_CALLS,GetCalls)
    yield takeLatest(ADD_CALL, addCall)
}