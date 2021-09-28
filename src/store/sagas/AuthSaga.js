import { put, call, takeLatest } from "redux-saga/effects";
import { REGISTER, LOGIN, LOGOUT, REFRESH_TOKEN, GET_UNAPPROVED_USERS, APPROVE_USER, CHANGE_PASSWORD, UPDATE_USER, GET_CLANS } from "../../constants/action-types";
import UserNumberToRole from "../../constants/EnumFunctions";
import authService from "../../services/AuthService";
import { RemoveCurrentlyLogged, SaveClans, SaveCurrentlyLogged, SaveToken, SaveUnapprovedUsers } from "../actions";
import makeid from '../../constants/RandomGenerator';
import incidentService from "../../services/IncidentService";

function* registerUser({payload}) {
    const data = { Email: payload.email, Password: payload.pass, ConfirmPassword: payload.pass2 }
    yield call(authService.registerNewUser,data)

    const dataInfo = { Username: payload.email, VrsteKorisnika: payload.role, NazivProfilneSlike: payload.file.name, DatumRodjenja: payload.date, Adresa: 'Gogoljeva 34' };
    yield call(authService.registerUserInfo,dataInfo)
}

function* loginUser({payload}) {

    const response = yield call (authService.fetchAdditionalUserData,payload.data.username)
    if (response === undefined) {
        const notification = { IdPoruke: 'NOT_' + makeid(6), IdKorisnika: payload.data.username, Sadrzaj: payload.data.username + '  User failed to log in!', Tip: 0, Procitana : false, Timestamp: '2021-07-22T00:00:00'}
        yield call(incidentService.addNotification,notification);
        return;
    }
    response.VrsteKorisnika = UserNumberToRole(response.VrsteKorisnika);

    if (response !== undefined) {
        const token = yield call(authService.loginUser,payload.data);
        yield put(SaveToken(token));

        if (token !== undefined) {
            yield put(SaveCurrentlyLogged(response))
            yield call(payload.loginCallback)
        }
    }
}

function* logoutUser() {
    console.log('User logged out!')
    localStorage.setItem('token','')
    yield put(SaveToken(''))
    yield put(RemoveCurrentlyLogged())
}

function* saveAuthToken() {
    const token = localStorage.getItem('token');
    yield put(SaveToken(token));
}

function* getUnapprovedUsers() {
    const data = yield call(authService.getUnapprovedUsers)
    yield put(SaveUnapprovedUsers(data))
}

function* approveUser({payload}) {
    console.log(payload)
    yield call(authService.approveUser,payload)
    const data = yield call(authService.getUnapprovedUsers)
    yield put(SaveUnapprovedUsers(data))
}

function* changePassword({payload}) {
    yield call(authService.changePass,payload)
}

function* updateLoggedInUser({ payload }) {
    yield call(authService.updateLoggedInUser,payload)
    const response = yield call (authService.fetchAdditionalUserData,payload.Username)
    if (response === undefined) {
        return;
    }
    response.VrsteKorisnika = UserNumberToRole(response.VrsteKorisnika);
    yield put(SaveCurrentlyLogged(response));
    const notification = { IdPoruke: 'NOT_' + makeid(6), IdKorisnika: payload.data.username, Sadrzaj: payload.data.username + '  User information updated!', Tip: 3, Procitana : false, Timestamp: '2021-07-22T00:00:00'}
    yield call(incidentService.addNotification,notification);
}

function* getClans() {
    const response = yield call(incidentService.getClans);
    yield put(SaveClans(response));
}

export default function* authSaga() {
    yield takeLatest(REGISTER, registerUser)
    yield takeLatest(LOGIN, loginUser)
    yield takeLatest(LOGOUT,logoutUser)
    yield takeLatest(REFRESH_TOKEN, saveAuthToken)
    yield takeLatest(GET_UNAPPROVED_USERS, getUnapprovedUsers)
    yield takeLatest(APPROVE_USER, approveUser)
    yield takeLatest(CHANGE_PASSWORD, changePassword)
    yield takeLatest(UPDATE_USER, updateLoggedInUser)
    yield takeLatest(GET_CLANS, getClans)
}