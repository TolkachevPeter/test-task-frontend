import {useEffect} from "react";
import {store} from '../../store/index';
import {connect as reduxConnect} from "react-redux";
import {reduxForm} from "redux-form";
import {mapSelectorsToProps} from "./core";

/*export function fetchHandlers(handlers) {*/
  //for (const handler of handlers) {
    //store.dispatch(handler.fetch());
  //}
/*}*/

export function checkReady(handlers) {
  const state = store.getState();
  return handlers.every(h => h.ready(state));
}

export function connectFunctionalComponent(component, {
  selectors = {},
  fetch = {},
  form: formHandler = null,
  modals = {}
}) {
  let mapDispatchToProps = {};

  for (let key in fetch) {
    mapDispatchToProps[`fetch_${key}`] = fetch[key].fetch;
  }

  for(let key in modals) {
    mapDispatchToProps[`open_${key}`] = modals[key].open;
    mapDispatchToProps[`close_${key}`] = modals[key].close;
  }

  const Wrapper = (props) => {
    useEffect(() => {
      for (let key in fetch) {
        const dispatchAction = props[`fetch_${key}`];
        dispatchAction();
      }
    }, []);

    // TODO Correct check fetch is ready
    //for (let key in fetch) {
      //if (!fetch[key].ready) {
        //return null;
      //}
    //}

    return component(props);
  };

  let wrappedComponent = Wrapper;

  if (formHandler) {
    selectors = {
      ...selectors,
      formValues: formHandler.formValues,
      formError: formHandler.formError,
    };

    mapDispatchToProps = {
      ...mapDispatchToProps,
      formChangeField: formHandler.formChangeField,
      formChange: formHandler.formChange,
      onSubmit: formHandler.submit,
      customSubmit: formHandler.submit
    };

    wrappedComponent = reduxForm(formHandler.form)(wrappedComponent);
  }

  return reduxConnect(mapSelectorsToProps(selectors), mapDispatchToProps)(wrappedComponent);
}
