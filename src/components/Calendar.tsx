import React from 'react';
import styled from 'styled-components';

import {CalendarMonth, CalendarModel, CalendarMonthStatus} from '../models';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: stretch;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: stretch;
`;

const Month = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:first-child) {
    margin-left: 6px;
  }

  @media (max-width: 768px) {
    min-width: 118px;
  }
`;

const Title = styled.div`
  margin-top: 15px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const Year = styled.div`
  margin-top: 2px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

export enum MonthType {
  Past,
  Current,
  Future
}

interface UnderlineProps {
  status: CalendarMonthStatus;
};

const getBackground = (props: UnderlineProps): string => {
  if(props.status === CalendarMonthStatus.Ok) return '#E2E8EF';
  if(props.status  === CalendarMonthStatus.Require) return '#02B549';
  if(props.status === CalendarMonthStatus.Warning) return '#F30B0B';
  return 'black';
};

const Underline = styled.div<UnderlineProps>`
  margin-top: 6px;
  align-self: stretch;
  height: 6px;
  border-radius: 2px;
  background: ${getBackground};
`;

/*export interface MonthProps {*/
  //title: string;
  //year: string;
  //type: MonthType;
//};

//export interface RowProps {
  //months: MonthProps[];
/*};*/

export interface CalendarProps {
  className?: string;
  calendar: CalendarModel;
};

type Row = CalendarMonth[];

const getRows = (months: CalendarMonth[]): Row[] => {
  let result = [];
  let rest = months;
  let {length} = months;
  while(length > 12) {
    result.push(rest.slice(0, 12));
    rest = rest.slice(12, length);
    length = rest.length;
  }
  if(length > 0) result.push(rest);
  return result;
};

const Calendar = (props: CalendarProps) => {
  const rows: Row[] = getRows(props.calendar.months);

  return (
    <Container className={props.className}>
      {rows.map((row: Row, index: number) => (
        <Row key={index}>
          {row.map((month: CalendarMonth, index: number) => (
            <Month key={index}>
              <Title>{month.title}</Title>
              <Year>{month.year}</Year>
              <Underline status={month.status} />
            </Month>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Calendar;
