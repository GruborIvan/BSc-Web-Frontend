import { all } from 'redux-saga/effects'
import authSaga from './AuthSaga';
import documentSaga from './DocumentSaga';
import incidentSaga from './IncidentSaga';

export default function* rootSaga() {
    yield all([
        authSaga(), 
        incidentSaga(),
        documentSaga()
    ]);
}