import {connectRouter} from 'connected-react-router';
import queryString from 'query-string';
import {all, takeEvery} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {appConfig} from '../store/config';
import {history} from '../store/history';
import {createType} from "../lib/ducks/core";

export const PREFIX = 'router';

const REFRESH_PAGE = createType(PREFIX, 'REFRESH_PAGE');
const REDIRECT_TO = createType(PREFIX, 'REDIRECT_TO');
const REDIRECT_TO_LOGIN = createType(PREFIX, 'REDIRECT_TO_LOGIN');
const LOGOUT = createType(PREFIX, 'LOGOUT');

export const getDuck = (state) => state[PREFIX];

export const getCurrentPath = createSelector(getDuck, ({ location }) => location?.pathname || '/');
export const getQueryParameters = createSelector(getDuck, ({ location }) => queryString.parse(location?.search || '') || {});

export const refreshPage = () => ({ type: REFRESH_PAGE });
export const redirectTo = (path) => ({ path, type: REDIRECT_TO });
export const redirectToLogin = () => ({ type: REDIRECT_TO_LOGIN });
export const logout = () => ({ type: LOGOUT });

export const reducer = connectRouter(history);

function* refreshPageSaga() { // eslint-disable-line require-yield
  window.location.reload();
}

function redirectToLoginSaga() {
  window.location.href = appConfig.loginUrl;
}

function logoutSaga() {
  window.location.href = appConfig.logoutUrl;
}

export function* rootSaga() {
  yield all([
    takeEvery(REFRESH_PAGE, refreshPageSaga),
    // takeEvery(REDIRECT_TO, redirectToPathSaga),
    takeEvery(REDIRECT_TO_LOGIN, redirectToLoginSaga),
    takeEvery(LOGOUT, logoutSaga),
  ]);
}
