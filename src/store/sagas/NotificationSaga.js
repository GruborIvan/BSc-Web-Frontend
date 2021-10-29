import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_NOTIFICATION, GET_NOTIFICATIONS, MARK_NOTIFICATIONS_READ } from "../../constants/action-types";
import notificationService from "../../services/NotificationService";
import { SaveNotifications } from "../actions";

function* getNotifications({ payload }) {
    let response;
    if (payload === 'all') {
        response = yield call(notificationService.getAllNotifications)

    }
    else if (payload === 'unread') {
        response = yield call(notificationService.getUnreadNotifications)
    }
    else {
        response = yield call(notificationService.getNotificationType,payload)
    }
    yield put(SaveNotifications(response));
}

function* markNotificationAsRead({ payload }) {
    yield call(notificationService.markNotificationsRead,payload);
    const response = yield call(notificationService.getUnreadNotifications)
    yield put(SaveNotifications(response));
}

function* addNotification({ payload }) {
    console.log(payload)
    yield call(notificationService.addNotification,payload)
}

export default function* notificationsSaga() {
    yield takeLatest(GET_NOTIFICATIONS, getNotifications)
    yield takeLatest(MARK_NOTIFICATIONS_READ, markNotificationAsRead)
    yield takeLatest(ADD_NOTIFICATION, addNotification)
}