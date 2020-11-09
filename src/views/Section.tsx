import React from 'react';
import styled from 'styled-components';

import Wizard from '../views/Wizard';
import {CompanyInfo} from '../models';
import {getAccountCompany} from "../ducks/account";
import {connectFunctionalComponent} from "../lib/ducks/connect";

const GEAR_ICON = `${process.env.PUBLIC_URL}/assets/gear.svg`;
const QUESTION_ICON = `${process.env.PUBLIC_URL}/assets/question.svg`;
const EXIT_ICON = `${process.env.PUBLIC_URL}/assets/exit.svg`;
const EXIT_TEXT = 'Выйти';
const ADDRESS_TEXT = 'г. Москва, Пресненская наб. 6, строение 2';
const REQUISITES_TEXT = 'ИНН 7724451748 ОГРН 1187746779868';
const YEARS_TEXT = '2018 - 2020 ООО "Джетленд"';
const BRAND_TEXT = 'JetLend';
const BRAND_ICON = `${process.env.PUBLIC_URL}/assets/brand.png`;
const MENU_ICON = `${process.env.PUBLIC_URL}/assets/menu.svg`;

const Container = styled.section`
  flex: 1;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-itmes: stretch;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MobileHeader = styled.div`
  height: 74px;
  display: none;
  background: #FFFFFF;
  justify-content: stretch;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Brand = styled.img`
  width: 36px;
  height: 34px;
  margin-left: 22px;
`;

const MenuIcon = styled.img`
  width: 28px;
  height: 20px;
  margin-right: 20px;
`;

const BrandText = styled.div`
  margin-left: 12px;
  flex: 1;
  height: 20px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: #000C25;
`;

const Header = styled.div`
  display: none;
  height: 58px;
  background: #FFFFFF;
  box-shadow: 0px 4px 30px rgba(192, 192, 192, 0.3);
  justify-content: stretch;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const HeaderTitle = styled.div`
  margin-left: 30px;
  height: 18px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 18px;
  color: #000C25;
`;

const TitleButton = styled.img`
  margin-left: 16px;
  width: 16px;
  height: 16px;
`;

const HeaderMain = styled.div`
  flex: 1;
`;

const HelpButton = styled.div`
  width: 58px;
  height: 58px;
  border-left: 1px solid #F1F1F1;
  border-right: 1px solid #F1F1F1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ExitIcon = styled.img`
  margin-left: 30px;
  width: 18px;
  height: 18px;
`;

const ExitText = styled.div`
  margin-left: 12px;
  margin-right: 30px;
  height: 18px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #001646;
`;

const Footer = styled.div`
  height: 117px;
  background: #FFFFFF;
  box-shadow: 0px 4px 30px rgba(192, 192, 192, 0.3);
  display: none;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const Contacts = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #ADB1B6;
`;

export interface SectionProps {
  company: CompanyInfo;
};

const Section = ({company}: SectionProps) => {
  return (
    <Container>
      <MobileHeader>
        <Brand src={BRAND_ICON} />
        <BrandText>{BRAND_TEXT}</BrandText>
        <MenuIcon src={MENU_ICON} />
      </MobileHeader>
      <Header>
        <HeaderTitle>{company.title} {company.inn}</HeaderTitle>
        <TitleButton src={GEAR_ICON} />
        <HeaderMain />
        <HelpButton>
          <QuestionIcon src={QUESTION_ICON} />
        </HelpButton>
        <ExitIcon src={EXIT_ICON} />
        <ExitText>{EXIT_TEXT}</ExitText>
      </Header>
      <Wizard></Wizard>
      <Footer>
        <Contacts>
          <Row>{ADDRESS_TEXT}</Row>
          <Row>{REQUISITES_TEXT}</Row>
          <Row>{YEARS_TEXT}</Row>
        </Contacts>
      </Footer>
    </Container>
  );
};

export default connectFunctionalComponent(Section, {
  selectors: {
    company: getAccountCompany
  }
});
