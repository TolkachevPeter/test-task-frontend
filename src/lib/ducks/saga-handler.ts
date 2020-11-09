import {createUpdateAction} from "../../store/actions";
import {takeEvery} from "@redux-saga/core/effects";
import {createType} from "./core";

export function simpleSagaHandler(prefix, actionName, saga, opts: any = {}) {
  const actionKey = opts.key || 'value';

  const ACTION = createType(prefix, actionName);
  const action = createUpdateAction(ACTION, actionKey);

  const effects = [
    takeEvery(ACTION, saga),
  ];

  return {
    ACTION, action,
    effects,
  };
}
