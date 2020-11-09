import React from 'react';
import styled from 'styled-components';

import {ListItem} from '../models';

const OK_ITEM_ICON = `${process.env.PUBLIC_URL}/assets/ok_item.svg`;

export const ListWindow = styled.div`
  background: rgba(241, 241, 241, 0.5);
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: stretch;

  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
  }
`;

export const ListContent = styled.div`
  flex: 1;
  margin-left: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const ListTitle = styled.div`
  margin-top: 26px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  color: #000C25;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

export const ListStyled = styled.div`
  margin-top: 19px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const ListItemEl = styled.div`
  display: flex;
  justify-content: stretch;

  &:not(:first-child) {
    margin-top: 16px;

    @media (max-width: 768px) {
      margin-top: 12px;
    }
  }
`;

const ListOkIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const ListItemText = styled.div`
  flex: 1;
  margin-left: 12px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #000000;

  @media (max-width: 768px) {
    line-height: 18px;
  }
`;

export interface ListProps {
  items: ListItem[];
  className?: string;
}

const List = (props: ListProps) => {
  return (
    <ListStyled className={props.className}>
    {props.items.map((item: ListItem, index: number) => (
      <ListItemEl key={index}>
        <ListOkIcon src={OK_ITEM_ICON} />
        <ListItemText dangerouslySetInnerHTML={{__html: item.text}} />
      </ListItemEl>
    ))}
    </ListStyled>
  );
};

export default List;
