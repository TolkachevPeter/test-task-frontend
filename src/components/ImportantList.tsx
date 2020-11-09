import React from 'react';
import styled from 'styled-components';

const DETAILS_ONE = 'Займодавцами являются физические лица. В соответствии с законодательством РФ, компания-заемщик является налоговым агентом по НДФЛ и должна исчислить и удержать налог из доходов физического лица и перечислить в бюджет. Уплата НДФЛ за инвесторов, влечет за собой необходимость сдачи следующих видов отчетности: НДФЛ-6 (ежеквартально) и 2-НДФЛ (ежегодно)',
      DETAILS_TWO = 'Комиссия платформы будет удержана из суммы займа при его перечислении на расчетный счет компании.',
      DETAILS_THREE = 'Предварительное одобрение действительно в течение 7 календарных дней, затем заявка закрывается. Повторная заявка возможна не ранее чем через 30 дней.',
      DETAILS_FOUR = 'Соблюдение финансовой дисциплины позволит получить следующие преимущества по будущим займам:<br />- увеличить максимальный лимит до 3 000 000 рублей<br /> - увеличить максимальный срок до 12 месяцев<br /> - снизить процентную ставку до 15%<br /> - снизить уровень комиссии платформы до 1%';

const DetailsContainer = styled.div`
  margin-top: 13px;
  margin-right: 40px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DetailsRow = styled.div`
  display: flex;
  justify-content: stretch;

  &:not(:first-child) {
    margin-top: 21px;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const DetailsItem = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 21px;
`;

const DetailsDot = styled(DetailsItem)`
  width: 22px;
  color: #276EC3;

  @media (max-width: 768px) {
    float: left;
  }
`;

const DetailsText = styled(DetailsItem)`
  flex: 1;
  color: #000000;
`;

const ImportantList = () => {
  return (
    <DetailsContainer>
      <DetailsRow>
        <DetailsDot>•</DetailsDot>
        <DetailsText>{DETAILS_ONE}</DetailsText>
      </DetailsRow>
       <DetailsRow>
        <DetailsDot>•</DetailsDot>
        <DetailsText>{DETAILS_TWO}</DetailsText>
      </DetailsRow>
       <DetailsRow>
        <DetailsDot>•</DetailsDot>
        <DetailsText>{DETAILS_THREE}</DetailsText>
      </DetailsRow>
       <DetailsRow>
        <DetailsDot>•</DetailsDot>
        <DetailsText dangerouslySetInnerHTML={{__html: DETAILS_FOUR}} />
      </DetailsRow>
    </DetailsContainer>
  );
}

export default ImportantList;
