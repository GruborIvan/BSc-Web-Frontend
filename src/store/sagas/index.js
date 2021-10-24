import { all } from 'redux-saga/effects'
import authSaga from './AuthSaga';
import callsSaga from './CallsSaga';
import documentSaga from './DocumentSaga';
import incidentSaga from './IncidentSaga';
import notificationsSaga from './NotificationSaga';

export default function* rootSaga() {
    yield all([
        authSaga(), 
        incidentSaga(),
        documentSaga(),
        callsSaga(),
        notificationsSaga()
    ]);
}