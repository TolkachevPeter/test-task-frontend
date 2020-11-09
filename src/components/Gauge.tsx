import React from 'react';
import styled from 'styled-components';

export interface GaugeProps {
  className?: string;
  percents: number;
  length?: number;
};

const Text = styled.text`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 26px;
  fill: #5092E1;
`;
const Gauge = (props: GaugeProps) => {
  const length = props.length || 240;
  const half = length / 2;
  const amp = half - 4, originX = half, originY = half;
  const getRad = (percents: number): number => 2 * Math.PI * percents / 100;
  const getX = (percents: number): number => originX + Math.sin(getRad(percents)) * amp;
  const getY = (percents: number): number => originY - Math.cos(getRad(percents)) * amp;
  const getDir = (percents: number): number => percents < 50 ? 0 : 1;

  const x = getX(props.percents);
  const y = getY(props.percents);
  const dir = getDir(props.percents);
  const viewBox = `0 0 ${length} ${length}`;
  return (
    <svg className={props.className} width={length} height={length} viewBox={viewBox} fill="none">
      <circle cx={half} cy={half} r={amp} stroke="#E5E6E7" stroke-width="8" fill="none"/>
      {props.percents !== 100 &&
        <path d={`M${half} 4 A ${amp} ${amp} 0 ${dir} 1 ${x} ${y}`} stroke="#5092E1" stroke-width="8" fill="none"/>
      }
      {props.percents === 100 &&
        <circle cx={half} cy={half} r={amp} stroke="#5092E1" stroke-width="8" fill="none"/>
      }
      <Text x="42%" y="55%">{props.percents}%</Text>
    </svg>
  );
};

export default Gauge;
