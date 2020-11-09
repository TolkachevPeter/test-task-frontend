import React from 'react';
import styled from 'styled-components';

import {RatingType} from '../models';

export interface RatingProps {
  className?: string;
  type: RatingType;
}

const Container = styled.div`
  height: 60px;
  display: flex;
  justify-content: stretch;
  background: rgba(241, 241, 241, 0.5);
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Content = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Labels = styled.div`
  margin-top: 13px;
  display: flex;
  justify-content: space-around;
`;

const LabelBase = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  width: 40px;
  text-align: center;
`;

const Label = styled(LabelBase)`
  color: #000000;
`;

const ActiveLabel = styled(LabelBase)`
  color: #276EC3;
`;

const Line = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  height: 3px;
  background: #FFFFFF;
  border-radius: 3px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  width: 3px;
  height: 14px;
  background: #FFFFFF;
  border-radius: 3px;
`;

const ActiveGrid = styled.div`
  width: 8px;
  height: 14px;
  background: #276EC3;
  border-radius: 3px;
`;

const labelByValue = (value: string, active: string, index: number) => {
  if(value === active)
    return (
      <ActiveLabel key={index}>{value}</ActiveLabel>
    );
  return (
    <Label key={index}>{value}</Label>
  );
}

const gridByValue = (value: string, active: string, index: number) => {
  if(value === active)
    return (
      <ActiveGrid key={index} />
    );
  return (
    <Grid key={index} />
  );
}

const Rating = (props: RatingProps) => {
  const values = Object.values(RatingType);


  return (
    <Container className={props.className}>
      <Content>
        <Labels>
          {values.map((value: string, index: number) => labelByValue(value, props.type, index))}
        </Labels>
        <Line>
          {values.map((value: string, index: number) => gridByValue(value, props.type, index))}
        </Line>
      </Content>
    </Container>
  );
};

export default Rating;
