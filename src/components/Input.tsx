import React, {FormEvent} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #09192F;
`;

const InputContainer = styled.div`
  margin-top: 16px;
  height: 58px;
  align-self: stretch;
  background: rgba(241, 241, 241, 0.5);
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: stretch;
  align-items: center;
`;

const InputElement = styled.input`
  border: none;
  background: none;
  outline: none;
  margin-left: 24px;
  margin-right: 24px;
  width: calc(100% - 24px - 24px);
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;

  &::placeholder {
    color: #9198A3;
  }
`;

export interface InputProps {
  className?: string;
  title: string;
  placeholder: string;
  value: string;
  onChange: (event: FormEvent<HTMLElement>) => void;
}

const Input = (props: InputProps) => {
  const {value, onChange} = props;
  return (
    <Container className={props.className}>
      <Title>{props.title}</Title>
      <InputContainer>
        <InputElement value={value} onChange={onChange} type="text" placeholder={props.placeholder}/>
      </InputContainer>
    </Container>
  );
};

export default Input;
