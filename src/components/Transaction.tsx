import React from 'react';
import styled from 'styled-components';

import {connectFunctionalComponent} from "../lib/ducks/connect";
import {wizardTransactionHandler} from '../ducks/wizard';

const Cloak = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(51, 54, 56, 0.8);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1072px;
  width: 100%;
`;

const Window = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 690px;
  height: 414px;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export interface TransactionProps {
  onClose: () => void;
  customSubmit: () => void;
}

const Transaction = (props: TransactionProps) => {
  const preventClick = (event: MouseEvent) => {
    event.stopPropagation();
  }

  const onClick = () => {
    props.customSubmit();
    props.onClose();
  }

  return (
    <Cloak onClick={onClick}>
      <Container>
        <Window onClick={(event: any) => preventClick(event)}>
        </Window>
      </Container>
    </Cloak>
  );
};

export default connectFunctionalComponent(Transaction, {
  form: wizardTransactionHandler
});
