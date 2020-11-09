import {objectHandler} from "./object-handler";
import {createType} from "./core";
import {createUpdateAction} from "../../store/actions";
import {call, put, select, takeEvery} from "@redux-saga/core/effects";
import {createSelector} from "reselect";

export function modalHandler(prefix, actionName, dataKey) {
  const handler = objectHandler(prefix, dataKey);
  const {update, selector, reducer, reducerInfo} = handler;

  const OPEN = createType(prefix, 'OPEN_' + actionName);
  const CLOSE = createType(prefix, 'CLOSE_' + actionName);

  const open = createUpdateAction(OPEN);
  const close = createUpdateAction(CLOSE);

  function *changeOpenState(key, newState) {
    if (key !== undefined) {
      const state = yield select(selector);
      const currentOpenState = state.isOpen || {};
      yield put(update({
        isOpen: {
          ...currentOpenState,
          [key]: newState,
        }
      }));
    } else {
      yield put(update({isOpen: newState}));
    }
  }

  function* openSaga({value}) {
    yield call(changeOpenState, value, true);
  }

  function* closeSaga({value}) {
    yield call(changeOpenState, value, false);
  }

  const effects = [
    takeEvery(OPEN as any, openSaga),
    takeEvery(CLOSE as any, closeSaga),
  ];

  return {
    OPEN, CLOSE,
    open, close,
    update,
    selector,
    isOpen: createSelector(selector, data => data?.isOpen),
    reducer, reducerInfo,
    effects,
  };
}