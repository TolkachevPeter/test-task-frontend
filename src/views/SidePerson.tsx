import React from 'react';
import styled from 'styled-components';

import {PersonalManager} from '../models';

import {connectFunctionalComponent} from "../lib/ducks/connect";
import {getAccountPersonalManager} from "../ducks/account";

const OCCUPATION_TEXT = 'Ваш персональный менеджер';
const PHONE_ICON = `${process.env.PUBLIC_URL}/assets/phone_side_person.svg`;
const EMAIL_ICON =  `${process.env.PUBLIC_URL}/assets/envelope.svg`;

const Container = styled.div`
  height: 177px;
  border-top: 1px solid #F1F1F1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
`;

const InnerContainer = styled.div`
  margin-top: 28px;
  flex: 1;
  display: flex;
  justify-content: stretch;
  align-items: flex-start;
`;

const Photo = styled.img`
  width: 72px;
  height: 68px;
  margin-left: 24px;
`;

const Rows = styled.div`
  margin-left: 13px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const NameRow = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #002B68;
`;

const OccupationRow = styled.div`
  margin-top: 7px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #000C25;
`;

const CompositeRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: stretch;
  align-items: center;
`;

const PhoneIcon = styled.img`
  width: 17px;
  height: 17px;
`;

const PhoneText = styled.div`
  margin-left: 10px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  color: #000C25;
`;

const EmailIcon = styled.img`
  width: 17px;
  height: 17px;
`;

const EmailText = styled.div`
  margin-left: 10px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  color: #000C25;
`;

export interface SidePersonProps {
  manager: PersonalManager;
};

const SidePerson = ({manager}: SidePersonProps) => {
  return (
    <Container>
      <InnerContainer>
        <Photo src={manager.avatarUrl} />
        <Rows>
          <NameRow>{manager.name}</NameRow>
          <OccupationRow>{OCCUPATION_TEXT}</OccupationRow>
          <CompositeRow>
            <PhoneIcon src={PHONE_ICON} />
            <PhoneText>{manager.phone}</PhoneText>
          </CompositeRow>
          <CompositeRow>
            <EmailIcon src={EMAIL_ICON} />
            <EmailText>{manager.email}</EmailText>
          </CompositeRow>
        </Rows>
      </InnerContainer>
    </Container>
  );
};

export default connectFunctionalComponent(SidePerson, {
  selectors: {
    manager: getAccountPersonalManager
  }
});
