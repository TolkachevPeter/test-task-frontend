import {createObjectReducer, createUpdateAction} from "../../store/actions";
import {createSelector} from "reselect";
import {createType} from "./core";

export function objectHandler(prefix: string, key: string) {
  const actionName = key.toUpperCase();

  const UPDATE_ACTION = createType(prefix, 'UPDATE_' + actionName);
  const update = createUpdateAction(UPDATE_ACTION);

  const getDuck = (state) => state[prefix];
  const selector = createSelector(getDuck, data => data[key]);

  const reducer = createObjectReducer(UPDATE_ACTION);
  const reducerInfo = {[key]: reducer};

  return {
    UPDATE_ACTION,
    update,
    selector,
    reducer, reducerInfo,
  };
}
