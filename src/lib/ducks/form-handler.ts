import {call, put, takeEvery} from "@redux-saga/core/effects";
import {change} from 'redux-form';
import {objectHandler} from "./object-handler";
import {createType} from "./core";
import {createSelector} from "reselect";
import {handleError} from "./api";
import {modalHandler} from "./modal-handler";

function applyValidator(values, errors, keys, validator, message) {
  const flatKeys = (keys || []).reduce((acc, v) => acc.concat(v), []);

  for (const key of flatKeys) {
    if (key in errors) {
      return;
    }

    let value = values?.[key];
    if (typeof value === 'string')
      value = value.trim();

    validator(value);
    if (!validator(value)) {
      errors[key] = message;
    }
  }
}

function createFormValidate({
  required = [],
  integer = [], nnegInteger = [], positiveInteger = [],
  float = [], nnegFloat = [], positiveFloat = [],
  date = [],
  extraValidate,
  debug = false,
}) {
  return values => {
    const errors = {};

    applyValidator(
      values, errors, [
        required,
        integer, nnegInteger, positiveInteger,
        date,
      ],
      v => (v !== undefined && v !== ''),
      'Заполните поле',
    );

    applyValidator(
      values, errors, [integer, nnegInteger, positiveInteger],
      v => /^[0-9]+$/.test(v),
      'Некорректное значение',
    );
    applyValidator(
      values, errors, nnegInteger,
      v => parseInt(v) >= 0,
      'Введите неотрицательное значение',
    );
    applyValidator(
      values, errors, positiveInteger,
      v => parseInt(v) > 0,
      'Введите положительное значение',
    );

    applyValidator(
      values, errors, [float, nnegFloat, positiveFloat],
      v => /^[0-9.]+$/.test(v),
      'Некорректное значение',
    );
    applyValidator(
      values, errors, nnegFloat,
      v => parseFloat(v) >= 0,
      'Введите неотрицательное значение',
    );
    applyValidator(
      values, errors, positiveFloat,
      v => parseFloat(v) > 0,
      'Введите положительное значение',
    );

    applyValidator(
      values, errors, date,
      v => /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}/i.test(v),
      'Введите дату в формате ДД.ММ.ГГГГ',
    );

    if (extraValidate !== undefined) {
      extraValidate(values, errors);
    }

    if (debug) {
      console.log(errors);
    }

    return errors;
  };
}

function createFormSubmitSaga({
  handler,
  actionName,
  apiMethod,
  apiMethodExt,
  apiConvertValues = values => values,
  onSuccess,
  onSuccessActions = [],
  onSuccessUpdate = [],
  //sms,
  echo = false,
}) {
  return function* submitSaga({values}) {
    let apiValues = apiConvertValues(values);
    let resp;

    try {
      yield put(handler.update({error: null}));

      // send SMS if necessary
/*      if (sms) {*/
        //const smsAction = typeof sms === 'string' ? sms : 'default';

        //const smsId = yield call(openSmsDialogSaga, apiValues, smsAction);
        //if (smsId === undefined) {
          //return;
        //}

        //apiValues = {...apiValues, sms_id: smsId};
      /*}*/

      if (echo) {
        console.log(`SUBMIT ${actionName}`, apiValues);
      }

      // call API method
      if (apiMethodExt !== undefined) {
        apiMethod = apiMethodExt(values);
      }
      resp = yield call(apiMethod, apiValues);

      // handle API response
      if (resp.status === 'OK') {
        // success actions
        if (onSuccess !== undefined) {
          yield call(onSuccess, resp);
        }

        for (let successAction of onSuccessActions) {
          yield put(successAction);
        }

        for (let handler of onSuccessUpdate) {
          yield put(handler.fetchUpdate());
        }
      } else {
        // handle API error
        yield put(handler.update({error: resp.error}));
      }

    } catch (e) {
      // unexpected error
      handleError(`SUBMIT ${actionName} error`, e);
    }
  };
}

export function simpleFormHandler(prefix, key, validate, onSubmitSaga, {
  handler = null,
  initialValues = {},
}) {
  const actionName = key.toUpperCase();

  if (!handler) {
    handler = objectHandler(prefix, key);
  }

  if (typeof validate === 'object') {
    validate = createFormValidate(validate);
  }

  const submitSagaParams: any = {
    handler,
    actionName
  };

  if(typeof onSubmitSaga === "object") {
    Object.assign(submitSagaParams, onSubmitSaga);
  }

  const submitSaga = createFormSubmitSaga(submitSagaParams);

  const SUBMIT = createType(prefix, 'SUBMIT_' + actionName);
  const submit = (values) => ({ type: SUBMIT, values });

  const dispatchExt = convert => (values, dispatch, props) => {
    dispatch(submit(convert(values, props)));
  };
  const submitExt = (action, key = 'action') => dispatchExt(values => ({
    [key]: action,
    values,
  }));

  const FORM_CHANGE = createType(prefix, 'FORM_CHANGE_' + actionName);
  const formChange = (values) => ({ type: FORM_CHANGE, values });

  const formName = prefix + '_' + actionName;
  const form = {
    form: formName,
    validate,
    initialValues,
  };

  function *formChangeSaga({values}) {
    for (const field in values) {
      yield put(change(formName, field, values[field]));
    }
  }

  const effects = [
    ...(handler.effects || []),
    takeEvery(SUBMIT as any, submitSaga),
    takeEvery(FORM_CHANGE as any, formChangeSaga),
  ];

  return {
    ...handler,
    SUBMIT, submit,
    dispatchExt, submitExt,
    form,
    formValues: createSelector(
      (state: any) => state.form[formName] || {},
      ({ values }) => values,
    ),
    formError: createSelector(handler.selector, (data: any) => data?.error),
    formChangeField: (field, value) => change(formName, field, value),
    formChange,
    effects,
  };
}

export function modalFormHandler(prefix, key, validate, onSubmitSaga) {
  const actionName = key.toUpperCase();
  const handler: any = modalHandler(prefix, actionName, key);

  function* onSuccessSaga(resp) {
    yield put(handler.close());
  }

  if (typeof onSubmitSaga === 'object') {

    onSubmitSaga = {
      ...onSubmitSaga,
      onSuccess: onSuccessSaga,
    }
  }

  return simpleFormHandler(prefix, key, validate, onSubmitSaga, handler as any);
}