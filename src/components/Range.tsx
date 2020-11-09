import React from 'react';
import styled from 'styled-components';

import {RangeItem} from '../models';

const WIDTH = 473;

export interface RangeProps {
  items: RangeItem[];
  title: string;
  value: RangeItem;
  onChange: (item: RangeItem) => void;
  className?: string;
}

interface ValueProps {
  width: number;
}

const Container = styled.div`
  width: ${WIDTH}px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-content: stretch;
  background: rgba(241, 241, 241, 0.5);
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 5px 5px 0px 0px;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: stretch;
  align-items: center;
`;

const Title = styled.div`
  flex: 1;
  margin-left: 24px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  color: #9198A3;
`;

const Value = styled.div`
  margin-right: 24px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #276EC3;
`;

const IndicatorContainer = styled.div`
  height: 2px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: no-wrap;
  align-items: center;
`;

const Indicator = styled.div`
  height: 2px;
  background: #276EC3;
`;

// width: ${(props: ValueProps) => props.width}px;

const ThumbContainer=  styled.div`
  width: 0;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Thumb = styled.div`
  flex: 1 0 16px;
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  border: 2px solid #276EC3;
  box-sizing: border-box;
  border-radius: 8px;
`;

const MoveContainer = styled.div`
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoveControl = styled.div`
  flex: 1 0 ${WIDTH + 16}px;
  width: ${WIDTH + 16}px;
  height: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Range = ({title, items, value, onChange, className}: RangeProps) => {
  const length = items.length - 1;
  const index = items.findIndex((item: RangeItem) => item.value === value.value);
  const percent = Math.ceil(100 * index / length);
  const width = Math.floor(percent * (WIDTH - 2) / 100);
  const size = WIDTH / length;
  const half = size / 2;

  const onMove = (event: React.MouseEvent) => {
    if(event.buttons === 1) {
      let newIndex = 0;
      const rect = event.currentTarget.getBoundingClientRect();
      const delta = event.clientX - rect.x - half - 8;
      if(delta > 0) {
        newIndex = Math.ceil(delta / size);
      }
      if (newIndex !== index) {
        if (newIndex > length) newIndex = length;
        onChange(items[newIndex])
      };
    }
  };

  const onClick = (event: React.MouseEvent) => {
    let newIndex = 0;
    const rect = event.currentTarget.getBoundingClientRect();
    const delta = event.clientX - rect.x - half - 8;
    if(delta > 0) {
      newIndex = Math.ceil(delta / size);
    }
    if (newIndex !== index) {
      if (newIndex > length) newIndex = length;
      onChange(items[newIndex])
    };
  };

  return (
    <Container className={className}>
      <Content>
        <Title>{title}</Title>
        <Value>{value.title}</Value>
      </Content>
      <IndicatorContainer>
        <Indicator style={{width: width}} />
        <ThumbContainer>
          <Thumb />
        </ThumbContainer>
      </IndicatorContainer>
      <MoveContainer>
        <MoveControl
          onMouseMove={onMove}
          onClick={onClick}
        />
      </MoveContainer>
    </Container>
  );
};

export default Range;
