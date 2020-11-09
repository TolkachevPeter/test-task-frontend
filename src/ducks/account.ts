import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {apiGetAccountInfo} from '../services/account-service';
import {simpleApiHandler} from "../lib/ducks/get-handler";

export const PREFIX = 'account';

export const accountHandler = simpleApiHandler(
  PREFIX,
  'info',
  apiGetAccountInfo,
  resp => resp.account
);

export const getAccountCompany = createSelector(accountHandler.selector, state => state?.company || {});
export const getAccountPersonalManager = createSelector(accountHandler.selector, state => state?.personalManager || {});

export const reducer = combineReducers({
  ...accountHandler.reducerInfo
});

export function* rootSaga() {
  yield all([
    ...accountHandler.effects
  ]);
}
