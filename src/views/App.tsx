import React from 'react';

import {connectFunctionalComponent} from "../lib/ducks/connect";
import {accountHandler} from "../ducks/account";

import SidePanel from '../components/SidePanel';
import Section from './Section';

const App = () => {
  return (
    <>
      <Section></Section>
      <SidePanel></SidePanel>
    </>
  );
}

export default connectFunctionalComponent(App, {
  selectors: {},
  fetch: {accountHandler}
});
