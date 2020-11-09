import React from 'react';
import styled from 'styled-components';

import SidePerson from '../views/SidePerson';

const BRAND_TEXT = 'JetLend';
const BRAND_ICON = `${process.env.PUBLIC_URL}/assets/brand.png`;
const MAIL_ICON = `${process.env.PUBLIC_URL}/assets/mail.svg`;
const MAIL_TEXT = `support@jetlend.ru`;
const PHONE_ICON = `${process.env.PUBLIC_URL}/assets/phone.svg`;
const PHONE_TEXT = `8(800) 222 93-32`;

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  width: 300px;
  background: #FFFFFF;
  box-shadow: 0px 4px 30px rgba(192, 192, 192, 0.3);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: stretch;
  align-items: center;
  height: 58px;
  border-bottom: 1px solid #F1F1F1;
  box-sizing: border-box;
`;

const Brand = styled.img`
  width: 36px;
  height: 34px;
  margin-left: 29px;
`;

const BrandText = styled.div`
  flex: 1;
  margin-left: 12px;
  height: 20px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: #000C25;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
`;

const Footer = styled.footer`
  display: flex; flex-direction: column;
  align-items: stretch;
  height: 117px;
  border-top: 1px solid #F1F1F1;
  box-sizing: border-box;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  height: 20px;
`;

const FooterPhone = styled(FooterItem)`
  margin-top: 29px;
`;

const FooterEmail = styled(FooterItem)`
  margin-top: 18px;
`;

const FooterIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 30px;
`;

const FooterText = styled.div`
  margin-left: 13px;
  height: 20px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #000C25;
`;

const SidePanel = () => {
  return (
    <Container>
      <Header>
        <Brand src={BRAND_ICON} />
        <BrandText>{BRAND_TEXT}</BrandText>
      </Header>
      <Main>
        <SidePerson />
      </Main>
      <Footer>
        <FooterPhone>
          <FooterIcon src={PHONE_ICON} />
          <FooterText>{PHONE_TEXT}</FooterText>
        </FooterPhone>
        <FooterEmail>
          <FooterIcon src={MAIL_ICON} />
          <FooterText>{MAIL_TEXT}</FooterText>
        </FooterEmail>
      </Footer>
    </Container>
  );
};

export default SidePanel;
