import {testAsyncResponse, testPostResponse, testResponse} from "./util";
import {CalcData, Conditions, WizardState} from '../models';
import {
  deny,
  details,
  docs,
  docsSuccess,
  financeProgress,
  limits,
  pickerData,
  verificationOne,
  verificationProgress,
  verificationThree,
  verificationTwo
} from './test-data';
import {dataToResponse} from '../utils/calc';

const wizardState: WizardState = {
  step: 0,
  allowedSteps: [1, 2, 3, 4, 5],
  product: 0,
};

export async function apiGetWizardState(): Promise<WizardState> {
  return testAsyncResponse(wizardState);
}

export async function apiSetProduct(data) {
  return await testPostResponse({
    step: 1,
  }, 'state');
}

export async function apiSetLoanParams(data) {
  return await testPostResponse({
    step: 2,
  }, 'state');
}

export async function apiSetStep(data) {
  return await testPostResponse(data, 'state');
}

export function apiGetWizardDocs() {
  return testResponse(docs);
}

export function apiUploadWizardBill({files}: {files: FileList}) {
  return testPostResponse(docsSuccess);
}

export function apiStartValuation() {
  return testPostResponse({
    step: 3,
  }, 'state');
}

export async function apiCalcProduct(data: CalcData) {
  return await testPostResponse(dataToResponse(data));
}

export function apiGetLimits() {
  return testResponse(limits);
}

export async function apiSetAprove(data: Conditions) {
  return await testPostResponse({step: 6}, 'state');
}

export function apiGetDeny() {
  return testResponse(deny);
}

export function apiGetVerification() {
  return testResponse(verificationOne);
}

export async function apiSetConditions(data) {
  return await testPostResponse(details);
}

export function apiGetPicker() {
  return testResponse(pickerData);
}

let percents = 0;
export function apiGetAnalyze() {
  percents = percents + 4;
  if(percents > 100) percents = 100;
  return testResponse({percents});
}

export async function apiSetPicker() {
  return await testPostResponse(verificationTwo);
}

export async function apiSetTransaction() {
  return await testPostResponse(verificationThree);
}

export async function apiSetLegal() {
  return await testPostResponse({step: 7}, 'state');
}

let verPercents = 0;
export function apiGetVerificationProgress() {
  verPercents = verPercents + 4;
  if(verPercents > 100) verPercents = 100;
  let progress = {
    ...verificationProgress,
    percents: verPercents
  };
  return testResponse(progress);
}

let finPercents = 0;
export function apiGetFinanceProgress() {
  finPercents = finPercents + 4;
  if(finPercents > 100) finPercents = 100;
  let progress = {
    ...financeProgress,
    percents: finPercents
  };
  return testResponse(progress);
}

export async function apiSetDocumentForm() {
  return await testPostResponse({});
}
