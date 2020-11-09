import React from 'react';
import styled from 'styled-components';

import Range from '../components/Range';
import {getAmountRangeItems, getMonthsRangeItems} from '../utils/range';
import {connectFunctionalComponent} from "../lib/ducks/connect";
import {wizardCalcHandler, wizardCalcResultHandler} from '../ducks/wizard';
import {CalcData, CalcResponse, RangeItem} from '../models';

const LOAN_AMOUNT_TITLE = 'Сумма займа',
      LOAN_TIME_TITLE = 'Срок';

const MONTHLY_TITLE = 'Ежемесячный платеж',
      MONTHLY_HELP = 'общая переплата';

const TOTAL_PERCENTS_TITLE = 'Проценты за весь период',
      TOTAL_COMISSION_TITLE = 'Комиссия платформы',
      TOTAL_COMISSION_VALUE = '40 000 ₽',
      TOTAL_OVERPAY_TITLE = 'Общая переплата',
      TOTAL_OVERPAY_VALUE = '110 000 ₽',
      TOTAL_HEADER = 'Переплата';

const LOAN_VALUE_FROM = 500000,
      LOAN_VALUE_TO = 3000000,
      LOAN_VALUE_STEP = 10000;

const TIME_VALUE_FROM = 1,
      TIME_VALUE_TO = 6,
      TIME_VALUE_STEP = 1;

const Main = styled.div`
  margin: 24px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin-top: 14px;
    margin-bottom: 0;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
`;

const Ranges = styled.div``;

const FirstRange = styled(Range)`
  margin-bottom: 37px;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const SecondRange = styled(Range)`
  margin-top: 37px;

  @media (max-width: 768px) {
    margin-top: 27px;
  }
`;

const Circle = styled.div`
  width: 300px;
  height: 300px;
  border: 4px solid #5092E1;
  box-sizing: border-box;
  border-radius: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 27px;
    align-self: center;
  }
`;

const MonthlyTitle = styled.div`
  margin-top: 105px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #9198A3;
`;

const MonthlyValue = styled.div`
  margin-top: 14px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  color: #276EC3;
`;

const MonthlyPercents = styled.div`
  margin-top: 19px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
`;

const MonthlyHelp = styled.div`
  margin-top: 6px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #9198A3;
`;

const TotalContainer = styled.div`
  margin-right: 40px;
  
  @media (max-width: 768px) {
    margin-right: -20px;
    margin-left: -20px;
    margin-top: 30px;
  }
`;

const TotalItem = styled.div`
  height: 48px;
  width: 473px;
  border-bottom: 1px solid rgba(226, 232, 239, 0.8);
  display: flex;
  justify-content: stretch;
  align-items: center;

  &:first-child {
    border-top: 1px solid rgba(226, 232, 239, 0.8);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

const TotalHeader = styled(TotalItem)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const TotalFooter = styled(TotalItem)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const TotalTitle = styled.div`
  flex: 1;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #000000;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const TotalValue = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #000000;

  @media (max-width: 768px) {
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const loanAmountItems: RangeItem[] = getAmountRangeItems(
  LOAN_VALUE_FROM, LOAN_VALUE_TO, LOAN_VALUE_STEP
); 
const loanTimeItems: RangeItem[] = getMonthsRangeItems(
  TIME_VALUE_FROM, TIME_VALUE_TO, TIME_VALUE_STEP
);

export interface CalcProps {
  formValues: CalcData;
  formChange: (values: any) => void;
  formChangeField: (field: string, value: any) => void;
  submit: () => void;
  resp: CalcResponse;
}

const Calc = (props: CalcProps) => {
  const {formValues, formChangeField, formChange, submit, resp} = props;
  const onChangeAmount = (item: RangeItem) => {
    formChangeField('amount', item.value);
    window.setTimeout(() => {
      submit();
    }, 0);
  };

  const onChangeTime = (item: RangeItem) => {
    formChangeField('time', item.value);
    window.setTimeout(() => {
      submit();
    }, 0);
  };

  const amountItem: RangeItem = loanAmountItems.find(item => item.value === formValues?.amount) || loanAmountItems[0];
  const timeItem: RangeItem = loanTimeItems.find(item => item.value === formValues?.time) || loanTimeItems[0];

  if(!formValues || !formValues.amount || !formValues || !formValues.time) {
    formChangeField('amount', amountItem.value);
    formChangeField('time', timeItem.value);
    window.setTimeout(() => {
      submit();
    }, 0);
  }

  return (
    <Main>
      <Ranges>
        <FirstRange
          title={LOAN_AMOUNT_TITLE}
          items={loanAmountItems}
          value={amountItem}
          onChange={onChangeAmount}/>
        <SecondRange
          title={LOAN_TIME_TITLE}
          items={loanTimeItems}
          value={timeItem}
          onChange={onChangeTime}/>
      </Ranges>
      <Circle>
        <MonthlyTitle>{MONTHLY_TITLE}</MonthlyTitle>
        <MonthlyValue>{resp.monthPay} &#8381;</MonthlyValue>
        <MonthlyPercents>{resp.percents} %</MonthlyPercents>
        <MonthlyHelp>{MONTHLY_HELP}</MonthlyHelp>
      </Circle>
      <TotalContainer>
        <TotalHeader>
          <TotalValue>{TOTAL_HEADER}</TotalValue>
        </TotalHeader>
        <TotalItem>
          <TotalTitle>{TOTAL_PERCENTS_TITLE}</TotalTitle>
          <TotalValue>{resp.interest} &#8381;</TotalValue>
        </TotalItem>
        <TotalItem>
          <TotalTitle>{TOTAL_COMISSION_TITLE}</TotalTitle>
          <TotalValue>{TOTAL_COMISSION_VALUE}</TotalValue>
        </TotalItem>
        <TotalFooter>
          <TotalTitle>{TOTAL_OVERPAY_TITLE}</TotalTitle>
          <TotalValue>{TOTAL_OVERPAY_VALUE}</TotalValue>
        </TotalFooter>
      </TotalContainer>
    </Main>
  );
}

export default connectFunctionalComponent(Calc, {
  selectors: {
    resp: wizardCalcResultHandler.selector
  },
  form: wizardCalcHandler
});
