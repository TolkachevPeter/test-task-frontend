import React from 'react';
import styled from 'styled-components';

import {wizardPickerDataHandler, wizardPickerHandler} from '../ducks/wizard';
import {connectFunctionalComponent} from "../lib/ducks/connect";
import {PickerModel, PickerWeek, PickerTime, PickerTimeStatus} from '../models';

const PREV_ICON = `${process.env.PUBLIC_URL}/assets/prev.svg`;
const NEXT_ICON = `${process.env.PUBLIC_URL}/assets/next.svg`;

const Cloak = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(51, 54, 56, 0.8);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1072px;
  width: 100%;
`;

const Window = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 690px;
  height: 414px;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Selector = styled.div`
  margin-top: 30px;
  display: flex;
  height: 26px;
  align-items: center;
`;

const PrevBtn = styled.img`
  width: 8px;
  height: 16px;
`;

const NextBtn = styled.img`
  width: 8px;
  height: 16px;
`;

const DateRange = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  color: #000C25;
`;

const Line = styled.div`
  margin-top: 24px;
  align-self: stretch;
  height: 1px;
  background: #E2E8EF;
`;

const Content = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const HeaderRow = styled.div`
  margin-top: 26px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const HeaderItem = styled.div`
  height: 20px;
  width: 110px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #000000;
`;

const TimeRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const TimeItem = styled.div`
  width: 110px;
  height: 32px;
  background: #5092E1;
  border-radius: 2px;
  text-align: center;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  color: #FFFFFF;
  cursor: pointer;
`;

const DisableTimeItem = styled.div`
  width: 110px;
  height: 32px;
  background: #E2E8EF;
  border-radius: 2px;
  text-align: center;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  color: #5092E1;
`;

export interface DateTimePickerProps {
  onClose: () => void;
  picker: PickerModel;
  customSubmit: (time: PickerTime) => void;
}

interface PickerRow {
  times: PickerTime[];
}

const getRows = (week: PickerWeek): PickerRow[] => {
  const result = [];
  for(let index = 0; index < 6; index++) {
    const times = week.days.map(day => day.times[index]);
    result.push({times});
  }
  return result;
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const {picker, customSubmit} = props;
  if(!picker) return (<></>);
  const week = picker.week;
  const rows = getRows(week);
  const preventClick = (event: MouseEvent) => {
    event.stopPropagation();
  }

  const onTimeClick = (time: PickerTime) => {
    customSubmit(time);
    props.onClose();
  }

  const getTimeItem = (time: PickerTime) => {
    const title = `${time.from}-${time.to}`;
    if(time.status === PickerTimeStatus.Allow) return (<TimeItem onClick={() => onTimeClick(time)} key={title}>{title}</TimeItem>);
    if(time.status === PickerTimeStatus.Deny) return (<DisableTimeItem key={title}>{title}</DisableTimeItem>);
    return (<></>);
  }

  return (
    <Cloak onClick={() => props.onClose()}>
      <Container>
        <Window onClick={(event: any) => preventClick(event)}>
          <Selector>
            {picker.allowPrev &&
              <PrevBtn src={PREV_ICON} />
            }
            <DateRange>{week.title}</DateRange>
            {picker.allowNext &&
              <NextBtn src={NEXT_ICON} />
            }
          </Selector>
          <Line />
          <Content>
            <HeaderRow>
              {week.days.map(day => (
                <HeaderItem key={day.title}>{day.title}</HeaderItem>
              ))}
            </HeaderRow>
            {rows.map((row, index) => (
              <TimeRow key={index}>
                {row.times.map(getTimeItem)}
              </TimeRow>
            ))}
          </Content>
        </Window>
      </Container>
    </Cloak>
  );
};

export default connectFunctionalComponent(DateTimePicker, {
  selectors: {
    picker: wizardPickerDataHandler.selector
  },
  form: wizardPickerHandler,
  fetch: {
    wizardPickerDataHandler
  }
});
