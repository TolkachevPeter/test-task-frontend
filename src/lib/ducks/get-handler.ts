import {createType} from "./core";
import {createUpdateAction, createUpdateReducer} from "../../store/actions";
import {createSelector} from "reselect";
import {call, put, select, takeEvery} from "@redux-saga/core/effects";
import {callApiSaga, handleError} from "./api";

export function simpleApiHandler(
  prefix: string, key: string,
  apiMethod,
  apiDataSelector = resp => resp.data,
  initialData = () => null,
) {
  const actionName = key.toUpperCase();

  const FETCH = createType(prefix, 'FETCH_' + actionName);
  const FETCH_DONE = createType(prefix, 'FETCH_DONE_' + actionName);
  const UPDATE = createType(prefix, 'UPDATE_' + actionName);

  const fetch = createUpdateAction(FETCH);
  const fetchUpdate = () => fetch({force: true});
  const fetchDone: any = createUpdateAction(FETCH_DONE);
  const update = createUpdateAction(UPDATE);

  const getDuck = (state) => state[prefix];
  const getData = createSelector(getDuck, data => data?.[key]);

  const selector = createSelector(getData, data => data?.data);
  const isFetching = createSelector(getData, data => data?.fetching);
  const ready = createSelector(getData, data => data?.ready);

  const reducer = createUpdateReducer(UPDATE, () => ({
    data: initialData(),
    fetching: false,
    ready: false,
  }));
  const reducerInfo = {[key]: reducer};

  function* fetchSaga({value = {}}: any) {
    const {
      force = false,
    } = value;

    // do not update if data is ready and force mode is off
    const isReady = yield select(ready);
    if (isReady && !force) {
      return;
    }

    // set fetching state
    yield put(update({
      fetching: true,
    }));

    // perform API request
    try {
      const resp = yield call(callApiSaga, apiMethod);
      if (!resp) {
        return;
      }

      yield put(update({
        data: apiDataSelector(resp),
        fetching: false,
        ready: true,
      }));

    } catch (e) {
      yield put(update({
        fetching: false,
      }));

      handleError(`FETCH ${actionName} error`, e);
      return;
    }

    // put DONE action
    yield put(fetchDone());
  }

  function* partialUpdateSaga(newData) {
    const currentState = yield select(getData);
    const newState = {
      ...currentState,
      data: {...currentState?.data, ...newData},
    };
    yield put(update(newState));
  }

  const effects = [
    takeEvery(FETCH, fetchSaga),
  ];

  return {
    FETCH_DONE,
    fetch, fetchUpdate,
    update, partialUpdateSaga,
    selector, ready, isFetching,
    reducer, reducerInfo,
    effects,
  };
}
