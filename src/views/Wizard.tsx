import React from 'react';
import styled from 'styled-components';
import StepThree from './StepThree';

import {StepType} from '../models';
import {connectFunctionalComponent} from "../lib/ducks/connect";
import {getWizardStep, wizardHandler, wizardStepHandler} from "../ducks/wizard";

const TEXT_ONE = 'Идентификация',
      TEXT_TWO = 'Документация',
      TEXT_THREE = 'Решение',
      TEXT_FOUR = 'Верификация',
      TEXT_FIVE = 'Перевод средств';

const Container = styled.div`
  flex: 1;
`;

const Window = styled.div`
  margin: 30px;
  border-radius: 5px;
  background: #FFFFFF;

  @media (max-width: 768px) {
    margin: 10px 0 0 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #F1F1F1;
  height: 92px;

  @media (max-width: 768px) {
    height: 72px;
  }
`;

interface NavItemProps {
  isMobileDel?: boolean;
}

const NavItem = styled.div<NavItemProps>`
  height: 32px;
  display: flex;
  align-items: center;

  &:first-child {
    margin-left: 40px;

    @media (max-width: 768px) {
      margin-left: 20px;
    }
  }

  &:not(:first-child) {
    margin-left: 30px;

    @media (max-width: 768px) {
      margin-left: 20px;
    }
  }

  @media (max-width: 768px) {
    display: ${(props: NavItemProps) => props.isMobileDel ? 'none' : 'flex'};
  }
`;

const Indicator = styled.div`
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  flex: 1 0 32px;
`;

const NextIndicator = styled(Indicator)`
  background: #F7F7F7;
  border: 1px solid #F1F1F1;
  color: #9198A3;
`;

const ActiveIndicator = styled(Indicator)`
  background: #FFFFFF;
  border: 2px solid #FFB31F;
  color: #FFB31F;
`;

const CompletedIndicator = styled(Indicator)`
  background: #02B549;
  color: #FFFFFF;
`;

const ItemText = styled.div`
  margin-left: 12px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const NextText = styled(ItemText)`
  color: #9198A3;
`;

const ActiveText = styled(ItemText)`
  color: #000C25;
`;

const CompletedText = styled(ItemText)`
  display: none;
  color: #9198A3;
  border-bottom: 1px dashed #9198A3;
  cursor: pointer;

  @media (min-width: 768px) {
    display: block;
  }
`;

const getView = () => {
  return <StepThree />;
};

interface SubmitFunc {
  (step: number): void;
};

const getFirstIndicator = (type: StepType, submitStep: SubmitFunc) => {
  switch(type) {
    case StepType.Six:
      return (
        <NavItem>
          <NextIndicator>1</NextIndicator>
          <NextText>{TEXT_ONE}</NextText>
        </NavItem>
      );
    case StepType.One:
    case StepType.Two:
      return (
        <NavItem>
          <ActiveIndicator>1</ActiveIndicator>
          <ActiveText>{TEXT_ONE}</ActiveText>
        </NavItem>
      );
    case StepType.Three:
      return (
        <NavItem>
          <CompletedIndicator onClick={() => submitStep(StepType.One)}>1</CompletedIndicator>
          <CompletedText onClick={() => submitStep(StepType.One)}>{TEXT_ONE}</CompletedText>
        </NavItem>
      );
  }
  return (
    <NavItem isMobileDel={true}>
      <CompletedIndicator onClick={() => submitStep(StepType.One)}>1</CompletedIndicator>
      <CompletedText onClick={() => submitStep(StepType.One)}>{TEXT_ONE}</CompletedText>
    </NavItem>
  );
};

const getSecondIndicator = (type: StepType, submitStep: SubmitFunc) => {
  switch(type) {
    case StepType.One:
    case StepType.Two:
      return (
        <NavItem>
          <NextIndicator>2</NextIndicator>
          <NextText>{TEXT_TWO}</NextText>
        </NavItem>
      );
    case StepType.Three:
      return (
        <NavItem>
          <ActiveIndicator>2</ActiveIndicator>
          <ActiveText>{TEXT_TWO}</ActiveText>
        </NavItem>
      );
    case StepType.Four:
    case StepType.Five:
      return (
        <NavItem>
          <CompletedIndicator onClick={() => submitStep(StepType.Three)}>2</CompletedIndicator>
          <CompletedText onClick={() => submitStep(StepType.Three)}>{TEXT_TWO}</CompletedText>
        </NavItem>
      );
    case StepType.Six:
      return (
        <NavItem>
          <NextIndicator>2</NextIndicator>
          <NextText>{TEXT_TWO}</NextText>
        </NavItem>
      );
  }
  return (
    <NavItem isMobileDel={true}>
      <CompletedIndicator onClick={() => submitStep(StepType.Three)}>2</CompletedIndicator>
      <CompletedText onClick={() => submitStep(StepType.Three)}>{TEXT_TWO}</CompletedText>
    </NavItem>
  );
};

const getThirdIndicator = (type: StepType, submitStep: SubmitFunc) => {
  switch(type) {
    case StepType.One:
    case StepType.Two:
    case StepType.Three:
      return (
        <NavItem>
          <NextIndicator>3</NextIndicator>
          <NextText>{TEXT_THREE}</NextText>
        </NavItem>
      );
    case StepType.Four:
    case StepType.Five:
    case StepType.Six:
      return (
        <NavItem>
          <ActiveIndicator>3</ActiveIndicator>
          <ActiveText>{TEXT_THREE}</ActiveText>
        </NavItem>
      );
    case StepType.Seven:
    case StepType.Eight:
      return (
        <NavItem>
          <CompletedIndicator onClick={() => submitStep(StepType.Four)}>3</CompletedIndicator>
          <CompletedText onClick={() => submitStep(StepType.Four)}>{TEXT_THREE}</CompletedText>
        </NavItem>
      );
  };
  return (
    <NavItem isMobileDel={true}>
      <CompletedIndicator onClick={() => submitStep(StepType.Four)}>3</CompletedIndicator>
      <CompletedText onClick={() => submitStep(StepType.Four)}>{TEXT_THREE}</CompletedText>
    </NavItem>
  );
};

const getFourthIndicator = (type: StepType, submitStep: SubmitFunc) => {
  switch(type) {
    case StepType.One:
    case StepType.Two:
    case StepType.Three:
    case StepType.Four:
    case StepType.Five:
    case StepType.Six:
      return (
        <NavItem>
          <NextIndicator>4</NextIndicator>
          <NextText>{TEXT_FOUR}</NextText>
        </NavItem>
      );
    case StepType.Seven:
    case StepType.Eight:
      return (
        <NavItem>
          <ActiveIndicator>4</ActiveIndicator>
          <ActiveText>{TEXT_FOUR}</ActiveText>
        </NavItem>
      );
  };
  return (
    <NavItem>
      <CompletedIndicator onClick={() => submitStep(StepType.Seven)}>4</CompletedIndicator>
      <CompletedText onClick={() => submitStep(StepType.Seven)}>{TEXT_FOUR}</CompletedText>
    </NavItem>
  );
};

const getFithIndicator = (type: StepType, submitStep: SubmitFunc) => {
  switch(type) {
    case StepType.One:
    case StepType.Two:
    case StepType.Three:
    case StepType.Four:
    case StepType.Five:
    case StepType.Six:
    case StepType.Seven:
    case StepType.Eight:
      return (
        <NavItem>
          <NextIndicator>5</NextIndicator>
          <NextText>{TEXT_FIVE}</NextText>
        </NavItem>
      );
    case StepType.Nine:
      return (
        <NavItem>
          <ActiveIndicator>5</ActiveIndicator>
          <ActiveText>{TEXT_FIVE}</ActiveText>
        </NavItem>
      );
  };
  return (
    <NavItem>
      <CompletedIndicator onClick={() => submitStep(StepType.Nine)}>5</CompletedIndicator>
      <CompletedText onClick={() => submitStep(StepType.Nine)}>{TEXT_FIVE}</CompletedText>
    </NavItem>
  );
};

const Wizard = (props: any) => {
  console.log('props', props);
  const submitStep = (step: number) => {
    props.formChange({step});
    window.setTimeout(() => {
      props.submit();
    }, 0);
  };

  return (
    <Container>
      <Window>
        <Nav>
            {getFirstIndicator(props.step, submitStep)}
            {getSecondIndicator(props.step, submitStep)}
            {getThirdIndicator(props.step, submitStep)}
            {getFourthIndicator(props.step, submitStep)}
            {getFithIndicator(props.step, submitStep)}
        </Nav>
        {getView()}
      </Window>
    </Container>
  );
}

export default connectFunctionalComponent(Wizard, {
  selectors: {
    step: getWizardStep,
  },
  form: wizardStepHandler,
  fetch: {
    wizardHandler,
  },
});
