import {call, put} from "@redux-saga/core/effects";
import {redirectToLogin} from "../../ducks/router";

export function* callApiSaga(apiMethod, ...params) {
  try {
    return yield call(apiMethod, ...params);
  } catch (error) {
    console.log(error);
    if (error.response?.status === 403) {
      yield put(redirectToLogin());
    } else {
      throw error;
    }
  }
}

export function handleError(title, e) {
  console.error(title, e);

  // FIXME
  alert('В данный момент ведутся технические работы. Пожалуйста, повторите запрос позже.');
}
