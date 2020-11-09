import {combineReducers} from 'redux';
import {all, call, put} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {
  apiCalcProduct,
  apiGetAnalyze,
  apiGetDeny,
  apiGetFinanceProgress,
  apiGetLimits,
  apiGetPicker,
  apiGetVerification,
  apiGetVerificationProgress,
  apiGetWizardDocs,
  apiGetWizardState,
  apiSetAprove,
  apiSetConditions,
  apiSetDocumentForm,
  apiSetLegal,
  apiSetLoanParams,
  apiSetPicker,
  apiSetProduct,
  apiSetStep,
  apiSetTransaction,
  apiStartValuation,
  apiUploadWizardBill
} from "../services/wizard-service";
import {objectHandler} from "../lib/ducks/object-handler";
import {simpleApiHandler} from "../lib/ducks/get-handler";
import {simpleFormHandler} from "../lib/ducks/form-handler";
import {modalHandler} from "../lib/ducks/modal-handler";

export const PREFIX = 'wizard';

// state and control

export const wizardHandler = simpleApiHandler(
  PREFIX, 'state',
  apiGetWizardState, resp => resp.state,
);

export const getWizardStep = createSelector(wizardHandler.selector, state => state?.step || 3);
export const getAllowedSteps = createSelector(wizardHandler.selector, state => state?.allowedSteps || []);

export const getWizardProduct = createSelector(wizardHandler.selector, state => state?.product);

export const wizardAnalyzeStatusHandler = simpleApiHandler(
  PREFIX, 'analyze', apiGetAnalyze, resp => resp.data
);

export const wizardVerificationProgresHandler = simpleApiHandler(
  PREFIX, 'verificationProgress', apiGetVerificationProgress, resp => resp.data
);

export const wizardFinanceProgresHandler = simpleApiHandler(
  PREFIX, 'financeProgress', apiGetFinanceProgress, resp => resp.data
);

// select product

export const wizardStepHandler = simpleFormHandler(
  PREFIX, 'step', {}, {
    apiMethod: apiSetStep,
    onSuccess: updateResponseStateSaga,
    echo: true
  }, {}
);

export const wizardProductHandler = simpleFormHandler(
  PREFIX, 'product', {}, {
    apiMethod: apiSetProduct,
    onSuccess: updateResponseStateSaga,
    echo: true,
  }, {},
);

// select loan params

export const wizardLoanParamsHandler = simpleFormHandler(
  PREFIX, 'loanParams', {}, {
    apiMethod: apiSetLoanParams,
    onSuccess: updateResponseStateSaga,
    echo: true,
  }, {
    initialValues: {},
  }
);

export const wizardDocumentFormHandler = simpleFormHandler(
  PREFIX, 'document', {}, {
    apiMethod: apiSetDocumentForm,
    echo: true
  }, {}
);

export const wizardDenyHandler = simpleApiHandler(
  PREFIX, 'deny', apiGetDeny, resp => resp.data
);

export const wizardDocsHandler = simpleApiHandler(
  PREFIX, 'docs', apiGetWizardDocs, resp => resp.data
);

export const wizardLimitsHandler = simpleApiHandler(
  PREFIX, 'limits', apiGetLimits, resp => resp.data
);

export const wizardVerificationHandler = simpleApiHandler(
  PREFIX, 'verification', apiGetVerification, resp => resp.data
);

export const wizardPickerDataHandler = simpleApiHandler(
  PREFIX, 'pickerData', apiGetPicker, resp => resp.data
);

function* updateDocsSaga(newState) {
  if(!newState) return;
  yield call(wizardDocsHandler.partialUpdateSaga, newState.data);
}

// core

function* updateStateSaga(newState) {
  if (newState !== undefined) {
    yield call(wizardHandler.partialUpdateSaga, newState);
  }
}

function* updateResponseStateSaga({state}) {
  yield call(updateStateSaga, state);
}

export const wizardUploadBillHandler = simpleFormHandler(
  PREFIX, 'bill', {}, {
    apiMethod: apiUploadWizardBill,
    onSuccess: updateDocsSaga,
    echo: true
  }, {}
);

export const wizardValuationHandler = simpleFormHandler(
  PREFIX, 'valuation', {}, {
    apiMethod: apiStartValuation,
    onSuccess: updateResponseStateSaga,
    echo: true
  }, {}
);

export const wizardCalcHandler = simpleFormHandler(
  PREFIX, 'calc', {}, {
    apiMethod: apiCalcProduct,
    onSuccess: updateCalcSaga,
    echo: true
  }, {}
);

function* updateVerificationSaga(newState) {
  if(!newState) return;
  yield call(wizardVerificationHandler.partialUpdateSaga, newState.data)
}

export const wizardPickerHandler = simpleFormHandler(
  PREFIX, 'picker', {}, {
    apiMethod: apiSetPicker,
    onSuccess: updateVerificationSaga,
    echo: true
  }, {}
);

export const wizardTransactionHandler = simpleFormHandler(
  PREFIX, 'transactionHandler', {}, {
    apiMethod: apiSetTransaction,
    onSuccess: updateVerificationSaga,
    echo: true
  }, {}
);

export const wizardLegalHandler = simpleFormHandler(
  PREFIX, 'legalData', {}, {
    apiMethod: apiSetLegal,
    onSuccess: updateResponseStateSaga,
    echo: true
  }, {}
);

export const wizardConditionsHandler = simpleFormHandler(
  PREFIX, 'conditions', {}, {
    apiMethod: apiSetConditions,
    onSuccess: updateDetailsSaga,
    echo: true
  }, {}
);

export const wizardAproveHandler = simpleFormHandler(
  PREFIX, 'aprove', {}, {
    apiMethod: apiSetAprove,
    onSuccess: updateResponseStateSaga,
    echo: true
  }, {}
);

export const wizardCalcResultHandler = objectHandler(
  PREFIX, 'calc_result'
);

export const wizardDetailsHandler = objectHandler(
  PREFIX, 'details'
);

function* updateDetailsSaga(newState) {
  if(!newState) return;
  const {update} = wizardDetailsHandler;
  yield put(update(newState.data));
}

function* updateCalcSaga(newState) {
  if(!newState) return;
  const {update} = wizardCalcResultHandler;
  yield put(update(newState.data));
}

export const wizardPassportModal = modalHandler(
  PREFIX, 'passport', 'passport'
);

export const wizardDateTimePickerModal = modalHandler(
  PREFIX, 'dateTimePicker', 'dateTimePicker'
);

export const wizardTransactionModal = modalHandler(
  PREFIX, 'transaction', 'transaction'
);

export const wizardLegalModal = modalHandler(
  PREFIX, 'legal', 'legal'
);

export const reducer = combineReducers({
  ...wizardHandler.reducerInfo,
  ...wizardProductHandler.reducerInfo,
  ...wizardLoanParamsHandler.reducerInfo,
  ...wizardStepHandler.reducerInfo,
  ...wizardDocsHandler.reducerInfo,
  ...wizardUploadBillHandler.reducerInfo,
  ...wizardPassportModal.reducerInfo,
  ...wizardDateTimePickerModal.reducerInfo,
  ...wizardValuationHandler.reducerInfo,
  ...wizardAnalyzeStatusHandler.reducerInfo,
  ...wizardCalcHandler.reducerInfo,
  ...wizardCalcResultHandler.reducerInfo,
  ...wizardLimitsHandler.reducerInfo,
  ...wizardConditionsHandler.reducerInfo,
  ...wizardDetailsHandler.reducerInfo,
  ...wizardAproveHandler.reducerInfo,
  ...wizardDenyHandler.reducerInfo,
  ...wizardVerificationHandler.reducerInfo,
  ...wizardPickerDataHandler.reducerInfo,
  ...wizardPickerHandler.reducerInfo,
  ...wizardTransactionModal.reducerInfo,
  ...wizardLegalModal.reducerInfo,
  ...wizardTransactionHandler.reducerInfo,
  ...wizardLegalHandler.reducerInfo,
  ...wizardVerificationProgresHandler.reducerInfo,
  ...wizardFinanceProgresHandler.reducerInfo
});

export function* rootSaga() {
  yield all([
    ...wizardHandler.effects,
    ...wizardProductHandler.effects,
    ...wizardLoanParamsHandler.effects,
    ...wizardStepHandler.effects,
    ...wizardDocsHandler.effects,
    ...wizardUploadBillHandler.effects,
    ...wizardPassportModal.effects,
    ...wizardDateTimePickerModal.effects,
    ...wizardValuationHandler.effects,
    ...wizardAnalyzeStatusHandler.effects,
    ...wizardCalcHandler.effects,
    ...wizardLimitsHandler.effects,
    ...wizardConditionsHandler.effects,
    ...wizardAproveHandler.effects,
    ...wizardDenyHandler.effects,
    ...wizardVerificationHandler.effects,
    ...wizardPickerDataHandler.effects,
    ...wizardPickerHandler.effects,
    ...wizardTransactionModal.effects,
    ...wizardLegalModal.effects,
    ...wizardTransactionHandler.effects,
    ...wizardLegalHandler.effects,
    ...wizardVerificationProgresHandler.effects,
    ...wizardFinanceProgresHandler.effects
  ]);
}
