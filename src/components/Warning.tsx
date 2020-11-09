import React from 'react';
import styled from 'styled-components';

const WARNING_ICON = `${process.env.PUBLIC_URL}/assets/warning_icon.svg`;
const REFRESH_ICON = `${process.env.PUBLIC_URL}/assets/refresh_warning.svg`;

const Container = styled.div`
  height: 46px;
  background: #FFB31F;
  border-radius: 5px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
    align-items: flex-start;
  }
`;

export enum WarningIconType {
  Warning,
  Refresh
}

const Icon = styled.img`
  margin-left: 12px;
  width: 22px;
  height: 22px;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const Text = styled.div`
  margin-left: 10px;
  margin-right: 20px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #FFFFFF;

  @media (max-width: 768px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

export interface WarningProps {
  className?: string;
  text: string;
  type?: WarningIconType;
};

const Warning = (props: WarningProps) => {
  let icon = WARNING_ICON;
  if(props.type === WarningIconType.Refresh) icon = REFRESH_ICON;
  return (
    <Container className={props.className}>
      <Icon src={icon} />
      <Text>{props.text}</Text>
    </Container>
  );
};

export default Warning;
