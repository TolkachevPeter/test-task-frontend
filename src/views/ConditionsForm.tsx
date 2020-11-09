import React, {useEffect} from 'react';
import styled from 'styled-components';

import {
  getAmountRangeItems,
  getMonthsRangeItems,
  getPeriodicRangeItems,
  getDaysByPeriod,
  getDaysByMonths} from '../utils/range';
import {
  wizardLimitsHandler,
  wizardConditionsHandler,
  wizardDetailsHandler} from "../ducks/wizard";
import {Limits, Conditions, Details} from '../models';
import {StepType, RangeItem} from '../models';
import {withSpaces, getMonthsStr, getDaysStr, CURRENCY_SUFFIX} from '../utils';
import Range from '../components/Range';
import Rating from '../components/Rating';
import List, { ListWindow, ListContent, ListTitle, ListProps } from '../components/List';
import PaymentTable from '../components/PaymentTable';
import {connectFunctionalComponent} from "../lib/ducks/connect";

const PANEL_ONE_TEXT = 'Сумма займа',
      PANEL_TWO_VALUE_TEXT = 'годовых',
      PANEL_TWO_TEXT = 'Процентная ставка',
      PANEL_THREE_TEXT = 'Максимальный срок',
      RANGE_ONE_TEXT = 'Сумма займа',
      RANGE_TWO_TEXT = 'Срок займа',
      RANGE_THREE_TEXT = 'Периодичность платежей';

const LOAN_VALUE_FROM = 500000,
      LOAN_VALUE_STEP = 10000;

const TIME_VALUE_FROM = 1,
      TIME_VALUE_STEP = 1;

const LIST_ONE = [
  ' - сумма займа.',
  ' - периодичность регулярного платежа.',
  ' - срок займа.',
  ' - процентная ставка.'
];

const LIST_TWO = [
  ' - общая переплата по займу (',
  ' от суммы займа): <br />',
  ' - переплата по процентам за весь срок. <br />',
  ' - комиссия платформы.',
  'Досрочное погашение - в любой момент без штрафов.',
  'Поручительство генерального директора Иванова Ивана Ивановича.'
]

const TITLE = 'Вашему бизнесу предварительно присвоен рейтинг',
      TITLE_TWO = 'Определите необходимую сумму, срок и периодичность платежей',
      TITLE_THREE = 'График платежей',
      LISTS_TITLE = 'Выбранные условия финансирования:';

const Content = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const CurrentRating = styled(Rating)`
  margin-top: 15px;
  margin-right: 40px;

  @media (max-width: 768px) {
    margin-right: auto;
  }
`;

const Title = styled.div`
  margin-top: 20px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #000C25;

  @media (max-width: 768px) {
    margin-top: 15px;
    line-height: 22px;
  }
`;

const TitleRating = styled.span`
  margin-left: 0.5em;
  color: #276EC3;
`;

const InfoPanels = styled.div`
  margin-top: 30px;
  height: 100px;
  border-top: 1px solid #E2E8EF;
  border-bottom: 1px solid #E2E8EF;
  display: flex;
  justify-content: stretch;

  @media (max-width: 768px) {
    margin-top: 5px;
    border: none;
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 768px) {
    border-bottom: 1px solid #E2E8EF;
  }
`;

const Panel = styled.div`
  margin-left: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    border-right: 1px solid #E2E8EF;

    @media (max-width: 768px) {
      border: none;
    }
  }

  &:last-child {
    @media (max-width: 768px) {
      margin-bottom: 15px;
    }
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
    border: none;
  }
`;

const PanelValue = styled.div`
  margin-top: 28px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: #276EC3;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const PanelText = styled.div`
  margin-top: 6px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;

const Title2 = styled.div`
  margin-top: 26px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 21px;
  color: #000C25;

  @media (max-width: 768px) {
    margin-top: 17px;
    font-size: 18px;
    line-height: 22px;
  }
`;

const Title3 = styled(Title2)`
  margin-top: 23px;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const Ranges = styled.div`
  margin-top: 26px;
  margin-right: 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 15px;
    margin-right: 0;
  }
`;

const CurrentRange = styled(Range)`
  @media (max-width: 768px) {
    &:not(:first-child) {
      margin-top: 27px;
    }
  }
`;

const ListContainer = styled.div`
  margin-top: 37px;
  border-top: 1px solid #E2E8EF;
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  @media (max-width: 768px) {
    margin-top: 27px;
  }
`;

const CurrentListWindow = styled(ListWindow)`
  margin: 30px 40px;
  flex: 1;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ListsContainer = styled.div`
  display: flex;
  justify-content: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CurrentList = styled(List)`
  flex: 1;
`;

const PaysContainer = styled.div`
  border-top: 1px solid #E2E8EF;
`;

const CurrentPaymentTable = styled(PaymentTable)`
  margin-top: 21px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const checkValues = (formValues?: Conditions): boolean => {
  return !formValues ||
    formValues.amount == null ||
    formValues.period == null ||
    formValues.time == null;
}

interface ConditionsFormProps {
  formValues: Conditions;
  formChangeField: (field: string, value: any) => void;
  submit: () => void;
  changeStep: (type: StepType) => void;
  limits: Limits;
  details: Details;
};

const ConditionsForm = (props: ConditionsFormProps) => {
  const {limits, formValues, formChangeField, submit} = props;
  let {details} = props;

  if(!limits) return (<></>);
  if(!details || Object.keys(details).length === 0) details = limits.details;

  if(checkValues(formValues)) {
    const {conditions} = limits;
    formChangeField('amount', conditions.amount);
    formChangeField('time', conditions.time);
    formChangeField('period', conditions.period);
  }

  const amountItems = getAmountRangeItems(LOAN_VALUE_FROM, limits.amount, LOAN_VALUE_STEP); 
  const timeItems = getMonthsRangeItems(TIME_VALUE_FROM, limits.time, TIME_VALUE_STEP);
  const periodItems = getPeriodicRangeItems();

  const amountItem = amountItems.find(item => item.value === formValues?.amount) || amountItems[0];
  const timeItem = timeItems.find(item => item.value === formValues?.time) || timeItems[0];
  const periodItem = periodItems.find(item => item.value === formValues?.period) || periodItems[0];

  if((!details || Object.keys(details).length === 0)) {
    details = limits.details;
  }

  const amountLimitStr = `${withSpaces(limits.amount.toString())} ${CURRENCY_SUFFIX}`;
  const percentsLimitStr = `${limits.percents}% ${PANEL_TWO_VALUE_TEXT}`;
  const timeLimitStr = `${limits.time} ${getMonthsStr(limits.time)}`;
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
  const onChangePeriod = (item: RangeItem) => {
    formChangeField('period', item.value);
    window.setTimeout(() => {
      submit();
    }, 0);
  };

  const amountStr = `${withSpaces(amountItem.value.toString())} ${CURRENCY_SUFFIX}`;
  const periodDays = getDaysByPeriod(periodItem.value);
  const periodStr = `${periodDays} ${getDaysStr(periodDays)}`;
  const timeDays = getDaysByMonths(timeItem.value);
  const timeStr = `${timeDays} ${getDaysStr(timeDays)}`;

  const listOne: ListProps = {
    items: [
      {text: `${amountStr} ${LIST_ONE[0]}`},
      {text: `${periodStr} ${LIST_ONE[1]}`},
      {text: `${timeStr} ${LIST_ONE[2]}`},
      {text: `${limits.percents}% ${LIST_ONE[3]}`}
    ]
  };

  const allOverpayStr = `${withSpaces(details.allOverpay.toString())} ${CURRENCY_SUFFIX}`;
  const percentsOverpayStr = `${withSpaces(details.percentsOverpay.toString())} ${CURRENCY_SUFFIX}`;
  const commissionStr =  `${withSpaces(details.commission.toString())} ${CURRENCY_SUFFIX}`;

  const listTwo: ListProps = {
    items: [
      {text: `${allOverpayStr} ${LIST_TWO[0]}${details.percents}% ${LIST_TWO[1]}${percentsOverpayStr}${LIST_TWO[2]}${commissionStr}${LIST_ONE[3]}`},
      {text: LIST_TWO[4]},
      {text: `${LIST_TWO[5]} ${details.director}`}
    ]
  };

  return (
    <>
      <Content>
        <Title>
          {TITLE}
          <TitleRating>{limits.rating}</TitleRating>
        </Title>
        <CurrentRating type={limits.rating} />
      </Content>
      <InfoPanels>
        <Panel>
          <PanelValue>{amountLimitStr}</PanelValue>
          <PanelText>{PANEL_ONE_TEXT}</PanelText>
        </Panel>
         <Panel>
          <PanelValue>{percentsLimitStr}</PanelValue>
          <PanelText>{PANEL_TWO_TEXT}</PanelText>
        </Panel>
         <Panel>
          <PanelValue>{timeLimitStr}</PanelValue>
          <PanelText>{PANEL_THREE_TEXT}</PanelText>
        </Panel>
      </InfoPanels>
      <Content>
        <Title2>{TITLE_TWO}</Title2>
        <Ranges>
          <CurrentRange
            title={RANGE_ONE_TEXT}
            items={amountItems}
            value={amountItem}
            onChange={onChangeAmount}/>
          <CurrentRange
            title={RANGE_TWO_TEXT}
            items={timeItems}
            value={timeItem}
            onChange={onChangeTime}/>
          <CurrentRange
            title={RANGE_THREE_TEXT}
            items={periodItems}
            value={periodItem}
            onChange={onChangePeriod}/>
        </Ranges>
      </Content>
      <ListContainer>
        <CurrentListWindow>
          <ListContent>
            <ListTitle>{LISTS_TITLE}</ListTitle>
            <ListsContainer>
              <CurrentList {...listOne} />
              <CurrentList {...listTwo} />
            </ListsContainer>
          </ListContent>
        </CurrentListWindow>
      </ListContainer>
      <PaysContainer>
        <Title3>{TITLE_THREE}</Title3>
        <CurrentPaymentTable {...details.payments} />
      </PaysContainer>
    </>
  );
}

export default connectFunctionalComponent(ConditionsForm, {
  selectors: {
    limits: wizardLimitsHandler.selector,
    details: wizardDetailsHandler.selector
  },
  form: wizardConditionsHandler,
  fetch: {
    wizardLimitsHandler
  }
});
