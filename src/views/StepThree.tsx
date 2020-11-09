import React from 'react';
import styled from 'styled-components';

import {connectFunctionalComponent} from "../lib/ducks/connect";
import {wizardDocsHandler, wizardValuationHandler} from "../ducks/wizard";
import {WizardDocs, WizardDocType} from '../models';
import Button from '../components/Button';
import DocsUpload, {DocsUploadProps} from '../components/DocsUpload';
import Calendar from '../components/Calendar';
import Warning from '../components/Warning';
import List, {ListContent, ListProps, ListTitle, ListWindow} from '../components/List';

const TITLE_TEXT = 'Загрузите документацию',
      BUTTON_TEXT = 'Отправить на оценку';

const DOCS_PIC = `${process.env.PUBLIC_URL}/assets/docs_pic.png`;
const DOCS_PIC_MOB = `${process.env.PUBLIC_URL}/assets/tochka.mobile.png`;

const MVP_DOCS_TITLE = 'Заполните паспортные данные и загрузите паспорта директора и бенефициаров',
      BILL_DOCS_TITLE = 'Загрузите банковские выписки за последние 24 месяца в формате .txt (1C), по следующим счетам';

const LIST: ListProps = {
  items: [
    {text: 'Ежемесячное обслуживание счета – 0 рублей'},
    {text: 'Платежи в пользу юрлиц, ИП и физлиц - бесплатно'},
    {text: 'Эквайринг, зарплатный проект, валютный контроль – подключается одним кликом в интернет-банке'},
    {text: 'Точка дарит 190 000 рублей на рекламу и развитие вашего бизнеса'}
  ]
};

const LIST_TEXT_START = 'Откройте счет',
      LIST_TEXT = 'в банке Точка (Открытие). При проведении безакцептного списания ставка снижается на 1% пункт.';


const WARNING_TEXT = 'Загрузите выписки за период 06.06.2017 по 06.06.2020. Это позволит повысить вероятность одобрения.';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    margin: 0;
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
    margin-left: 20px;
  }
`;

const DocsContainer = styled.div`
  margin-top: 24px;
  margin-right: 40px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  align-self: stretch;

  @media (max-width: 768px) {
    margin: 14px 0 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
`;

const CurrentDocsUpload = styled(DocsUpload)`
  flex: 1;

  &:not(:first-child) {
    margin-left: 30px;

    @media (max-width: 768px) {
      margin-left: 0;
      border-top: none;
    }
  }
`;

const CurrentCalendar = styled(Calendar)`
  margin-top: 12px;
  margin-right: 40px;
`;

const CurrentWarning = styled(Warning)`
  margin-top: 30px;
  margin-bottom: 29px;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

interface ListContainerProps {
  isCalendar: boolean;
}

const ListContainer = styled.div<ListContainerProps>`
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  @media (max-width: 768px) {
    border-top: ${(props: ListContainerProps) => props.isCalendar ? '1px solid #E2E8EF': 'none'};
  }
`;

const CurrentListWindow = styled(ListWindow)`
  margin: 30px 40px;
  flex: 1;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ListLink = styled.span`
  margin-right: 0.5em;
  color: #5092E1;
`;

const ListPicAndItems = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ListPic = styled.img`
  margin-top: 19px;
  margin-right: 20px;
  width: 150px;
  height: 110px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ListPicMob = styled.img`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 17px;
    width: 100%;
    height: 100%;
  }
`;

const Footer = styled.div`
  height: 108px;
  border-top: 1px solid #E2E8EF;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const FooterButton = styled(Button)`
  margin-left: 40px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px;
  }
`;

export interface StepThreeProps {
  docs: WizardDocs;
  submit: () => void;
};

const StepThree = (props: StepThreeProps) => {
  if(!props.docs) return (<></>);

  const changeStep = () => {
    props.submit();
  }

  const mvpDocs: DocsUploadProps = {
    status: props.docs.mvpStatus,
    title: MVP_DOCS_TITLE,
    docs: props.docs.mvpDocs,
    type: WizardDocType.Mvp
  }
  const billDocs: DocsUploadProps = {
    status: props.docs.billStatus,
    title: BILL_DOCS_TITLE,
    docs: props.docs.billDocs,
    type: WizardDocType.Bill
  }

  const isCalendar = props.docs.calendar.months.length > 0;

  return (
    <Container>
      <Content>
        <Title>{TITLE_TEXT}</Title>
        <DocsContainer>
          <CurrentDocsUpload {...mvpDocs} />
          <CurrentDocsUpload {...billDocs} />
        </DocsContainer>
        {isCalendar &&
          <CurrentCalendar calendar={props.docs.calendar} />
        }
        {props.docs.warning &&
          <CurrentWarning text={WARNING_TEXT} />
        }
      </Content>
      <ListContainer isCalendar={isCalendar}>
        <CurrentListWindow>
          <ListContent>
            <ListTitle>
              <ListLink>{LIST_TEXT_START}</ListLink>
              {LIST_TEXT}
            </ListTitle>
            <ListPicAndItems>
              <ListPic src={DOCS_PIC} />
              <ListPicMob src={DOCS_PIC_MOB} />
              <List {...LIST} />
            </ListPicAndItems>
          </ListContent>
        </CurrentListWindow>
      </ListContainer>
      <Footer>
        <FooterButton onClick={changeStep}>{BUTTON_TEXT}</FooterButton>
      </Footer>
    </Container>
  );
};

export default connectFunctionalComponent(StepThree, {
  selectors: {
    docs: wizardDocsHandler.selector
  },
  form: wizardValuationHandler,
  fetch: {
    wizardDocsHandler   
  }
});
