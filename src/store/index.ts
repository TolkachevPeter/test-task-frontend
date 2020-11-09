import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'connected-react-router';
import {all} from 'redux-saga/effects';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import ducks from '../ducks';
import {history} from './history';
import {getReducers, getSagas} from "../lib/ducks/core";


const sagas = getSagas(ducks);

function* rootSaga(...args) {
  yield all(sagas.map(saga => saga(...args)));
}


function configureDevStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const composeEnhancers = composeWithDevTools({});

  const store = createStore(
    combineReducers(getReducers(ducks)),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
}

function configureProdStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    combineReducers(getReducers(ducks)),
    initialState,
    applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
}

export const { store } = process.env.NODE_ENV === 'production' ? configureProdStore() : configureDevStore();
