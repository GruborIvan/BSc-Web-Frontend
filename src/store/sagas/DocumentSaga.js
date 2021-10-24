import { call, put, takeLatest } from "redux-saga/effects";
import documentService from '../../services/DocumentService'
import { SaveWorkRequests } from "../actions";
import { GET_WORK_REQUESTS } from "../../constants/action-types";

function* GetWorkRequests({ payload }) {
    let response;
    if (payload.type === 'Work requests') {
        response = yield call(documentService.getWorkRequests,payload.col);
    }
    else if (payload.type === 'Work plans') {
        response = yield call(documentService.getWorkPlans,payload.col);
    }
    else {
        response = yield call(documentService.getSafetyDocuments,payload.col);
    }
    yield put(SaveWorkRequests(response))
}

export default function* documentSaga() {
    yield takeLatest(GET_WORK_REQUESTS,GetWorkRequests)
}