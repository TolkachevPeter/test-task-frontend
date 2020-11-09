import React from 'react';
import styled from 'styled-components';

import {PaymentItems, PaymentItem} from '../models';

const COL_H_ONE = '№',
      COL_H_TWO = 'Дата платежа',
      COL_H_THREE = 'Общая сумма',
      COL_H_FOUR = 'Основной долг',
      COL_H_FIVE = 'Начисленные проценты',
      COL_H_SIX = 'Остаток задолженности',
      TOTAL = 'Итого';

const Container = styled.div`
  border-top: 1px solid #E2E8EF;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Row = styled.div`
  height: 49px;
  min-width: 1500px;
  border-bottom: 1px solid #E2E8EF;
  display: flex;
  justify-content: stretch;
  align-items: center;
`;

const HeaderItem = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #000000;
`;

const HeaderOne = styled(HeaderItem)`
  margin-left: 36px;
  width: 110px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const HeaderTwo = styled(HeaderItem)`
  width: 182px;
`;

const HeaderThree = styled(HeaderItem)`
  width: 201px;
`;

const HeaderFour = styled(HeaderItem)`
  width: 214px;
`;

const HeaderFive = styled(HeaderItem)`
  flex: 1;
`;

const HeaderSix = styled(HeaderItem)`
  width: 411px;
`;

const DataItem = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
`;

const DataOne = styled(DataItem)`
  margin-left: 36px;
  width: 110px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const DataTwo = styled(DataItem)`
  width: 180px;
`;

const DataThree = styled(DataItem)`
  width: 200px;
`;

const DataFour = styled(DataItem)`
  width: 214px;
`;

const DataFive = styled(DataItem)`
  flex: 1;
`;

const DataSix = styled(DataItem)`
  width: 411px;
`;

const TotalItem = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
`;

const TotalOne = styled(TotalItem)`
  margin-left: 36px;
  width: 290px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const TotalTwo = styled(TotalItem)`
  width: 200px;
`;

const TotalThree = styled(TotalItem)`
  width: 214px;
`;

const TotalFour = styled(TotalItem)`
  flex: 1;
`;

const PaymentTable = (props: PaymentItems) => {
  return (
    <Container className={props.className}>
      <Row>
        <HeaderOne>{COL_H_ONE}</HeaderOne>
        <HeaderTwo>{COL_H_TWO}</HeaderTwo>
        <HeaderThree>{COL_H_THREE}</HeaderThree>
        <HeaderFour>{COL_H_FOUR}</HeaderFour>
        <HeaderFive>{COL_H_FIVE}</HeaderFive>
        <HeaderSix>{COL_H_SIX}</HeaderSix>
      </Row>
      {props.items.map((item: PaymentItem, index: number) => (
        <Row key={index}>
          <DataOne>{item.id}</DataOne>
          <DataTwo>{item.date}</DataTwo>
          <DataThree>{item.sum}</DataThree>
          <DataFour>{item.dept}</DataFour>
          <DataFive>{item.percents}</DataFive>
          <DataSix>{item.balance}</DataSix>
        </Row>
      ))}
      <Row>
        <TotalOne>{TOTAL}</TotalOne>
        <TotalTwo>{props.total.sum}</TotalTwo>
        <TotalThree>{props.total.dept}</TotalThree>
        <TotalFour>{props.total.percents}</TotalFour>
      </Row>
    </Container>
  );
};

export default PaymentTable;
