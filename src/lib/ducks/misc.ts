import {createType} from "./core";
import {createSelector} from "reselect";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {handleError} from "./api";

export function collectionApiHandler(
  prefix, actionName, dataKey,
  apiMethod, apiDataSelector,
  options: any = {},
) {
  const reducerKey = options?.reducerKey || (source => source);

  const FETCH_ACTION = createType(prefix, 'FETCH_' + actionName);
  const UPDATE_ACTION = createType(prefix, 'UPDATE_' + actionName);

  const fetch = (source) => ({ type: FETCH_ACTION, source });
  const update = (source, payload) => ({ type: UPDATE_ACTION, source, payload });

  const getDuck = (state) => state[prefix];
  const selector = createSelector(getDuck, data => data[dataKey]);

  const reducer = (state = {}, { type, source, payload }) => {
    switch (type) {
    case UPDATE_ACTION:
      if (typeof payload === 'undefined')
        return {};
      return {[reducerKey(source)]: payload, ...state};
    default:
      return state;
    }
  };
  const reducerInfo = {[dataKey]: reducer};

  function* fetchSaga({source}) {
    // perform API request
    try {
      const resp = yield call(apiMethod, source);
      if (!resp) {
        return;
      }

      const payload = apiDataSelector(resp);
      yield put(update(source, payload));
    } catch (e) {
      handleError(`FETCH ${actionName} error`, e);
    }
  }

  const effects = [
    takeEvery(FETCH_ACTION as any, fetchSaga),
  ];

  return {
    fetch,
    update,
    selector,
    reducer, reducerInfo,
    effects,
  };
}
