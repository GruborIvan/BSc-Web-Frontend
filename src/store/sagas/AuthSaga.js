import { put, call, takeLatest } from "redux-saga/effects";
import { REGISTER, LOGIN, LOGOUT, REFRESH_TOKEN } from "../../constants/action-types";
import authService from "../../services/AuthService";
import { RemoveCurrentlyLogged, SaveCurrentlyLogged, SaveToken } from "../actions";

function* registerUser({payload}) {
    const data = { Email: payload.email, Password: payload.pass, ConfirmPassword: payload.pass2 }
    yield call(authService.registerNewUser,data)

    const dataInfo = { Username: payload.email, VrsteKorisnika: 'RADNIK', NazivProfilneSlike: payload.file.name, DatumRodjenja: payload.date, Adresa: 'Gogoljeva 34' };
    yield call(authService.registerUserInfo,dataInfo)
}

function* loginUser({payload}) {
    console.log(payload)
    const token = yield call(authService.loginUser,payload.data);
    if (token !== undefined) {
        yield put(SaveToken(token));
        const response = yield call (authService.fetchAdditionalUserData,payload.data.username)
        yield put(SaveCurrentlyLogged(response))
        yield call(payload.loginCallback)
    }
}

function* logoutUser() {
    console.log('User logged out!')
    localStorage.removeItem('token')
    yield put(SaveToken(''))
    yield put(RemoveCurrentlyLogged())
}

function* saveAuthToken() {
    const token = localStorage.getItem('token');
    yield put(SaveToken(token));
}

export default function* authSaga() {
    yield takeLatest(REGISTER, registerUser)
    yield takeLatest(LOGIN, loginUser)
    yield takeLatest(LOGOUT,logoutUser)
    yield takeLatest(REFRESH_TOKEN, saveAuthToken)

}