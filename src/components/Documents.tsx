import React, {FormEvent, MouseEvent, SyntheticEvent} from 'react';
import styled from 'styled-components';

import Input from './Input';
import Button from './Button';
import {wizardDocumentFormHandler} from '../ducks/wizard';
import {DocumentForm} from '../models';
import {connectFunctionalComponent} from "../lib/ducks/connect";

const HEADER = 'Заполните паспортные данные и загрузите паспорт',
      TITLE_ONE = 'Для прохождения идентификации, пожалуйста,',
      TITLE_TWO = 'заполните паспортные данные и загрузите паспорт';

const UPLOAD_ONE = 'Разворот с фотографией',
      UPLOAD_TWO = 'Разворот с регистрацией';

const FAMILY_TITLE = 'Фамилия:',
      FAMILY_PLACEHOLDER = 'Введите фамилию',
      SERIAL_TITLE = 'Серия и номер:',
      SERIAL_PLACEHOLDER = 'Введите серию и номер',
      ISSUE_TITLE = 'Дата выдачи:',
      ISSUE_PLACEHOLDER = '00.00.0000',
      NAME_TITLE = 'Имя:',
      NAME_PLACEHOLDER = 'Введите имя',
      DOB_TITLE = 'Дата рождения:',
      DOB_PLACEHOLDER = '00.00.0000',
      CODE_TITLE = 'Код подразделения:',
      CODE_PLACEHOLDER = '000000',
      LASTNAME_TITLE = 'Отчество:',
      LASTNAME_PLACEHOLDER = 'Введите отчество',
      PLACE_TITLE = 'Место рождения:',
      PLACE_PLACEHOLDER = 'Введите место рождения',
      ORG_TITLE = 'Кем выдан:',
      ORG_PLACEHOLDER = 'Например: Отделением УФМС России в г. Москва',
      REG_TITLE = 'Адрес регистрации:',
      REG_PLACEHOLDER = 'Введите адрес регистрации',
      NEXT = 'Продолжить',
      CANCEL = 'Отмена';

const Cloak = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(51, 54, 56, 0.8);
  overflow: auto;
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
  width: 1560px;
  height: 1012px;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-top: 33px;
  margin-left: 40px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  color: #000C25;
`;

const Line = styled.div`
  margin-top: 33px;
  height: 1px;
  background: #E2E8EF;
  width: 100%;
`;

const LineTwo = styled.div`
  margin-top: 30px;
  height: 1px;
  background: #E2E8EF;
  width: 100%;
`;

const Title = styled.div`
  margin-top: 20px;
  margin-left: 40px;
  display: flex;
`;

const TitleText = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #000C25;
`;

const TitleTextAcent = styled(TitleText)`
  font-weight: 600;
  margin-left: 0.5em;
`;

const UploadRow = styled.div`
  margin-top: 24px;
  margin-left: 40px;
  margin-right: 40px;
  align-self: stretch;
  display: flex;
  justify-content: stretch;
`;

const UploadItem = styled.div`
  flex: 1;
  height: 120px;
  background: rgba(241, 241, 241, 0.8);
  border: 1px dashed #D7DDE3;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #ADB1B6;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 40px;
  }
`;

const CurrentInput = styled(Input)`
  margin-top: 24px;
`;

const FieldsRow = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  justify-content: stretch;
`;

const FieldsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-left: 30px;
  }
`;

const LongFieldsRow = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Buttons = styled.div`
  margin-top: 31px;
  margin-left: 40px;
  display: flex;

`;

const CurrentButton = styled(Button)`
  &:not(first-child) {
    margin-left: 30px;
  }
`;

const CurrentAuxButton = styled(Button)`
  background: #E2E8EF;
  color: #5092E1;

  &:not(first-child) {
    margin-left: 30px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

export interface DocumentsProps {
  onClose: () => void;
  formValues: DocumentForm;
  formChangeField: (field: string, value: any) => void;
  submit: () => void;
}

const Documents = (props: DocumentsProps) => {
  const {onClose, formValues, formChangeField, submit} = props;

  const preventClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const uploadFoto = () => {
    document.getElementById('photo_file_upload').click();
  };

  const uploadReg = () => {
    document.getElementById('reg_file_upload').click();
  };

  const uploadChangeFoto = (event: SyntheticEvent<HTMLInputElement>) => {
    const files: FileList = event.currentTarget.files;
    if(files.length > 0) {
      formChangeField('scan_with_photo', files[0]);
    }
  };

  const uploadChangeReg = (event: SyntheticEvent<HTMLInputElement>) => {
    const files: FileList = event.currentTarget.files;
    if(files.length > 0) {
      formChangeField('scan_with_reg', files[0]);
    }
  };

  const onChangeField = (field: string) => (event: FormEvent<HTMLInputElement>) => {
    formChangeField(field, event.currentTarget.value);
  }

  const onSubmit = () => {
    submit();
    onClose();
  }

  return (
    <Cloak onClick={() => onClose()}>
      <Container>
        <Window onClick={preventClick}>
          <Header>{HEADER}</Header>
          <Line />
          <Title>
            <TitleText>{TITLE_ONE}</TitleText>
            <TitleTextAcent>{TITLE_TWO}</TitleTextAcent>
          </Title>
          <UploadRow>
            <UploadItem onClick={uploadFoto}>{UPLOAD_ONE}</UploadItem>
            <UploadItem onClick={uploadReg}>{UPLOAD_TWO}</UploadItem>
          </UploadRow>
          <FieldsRow>
            <FieldsColumn>
              <CurrentInput value={formValues?.family} onChange={onChangeField('family')} title={FAMILY_TITLE} placeholder={FAMILY_PLACEHOLDER}/>
              <CurrentInput value={formValues?.serial} onChange={onChangeField('serial')} title={SERIAL_TITLE} placeholder={SERIAL_PLACEHOLDER}/>
              <CurrentInput value={formValues?.reg_date} onChange={onChangeField('reg_date')} title={ISSUE_TITLE} placeholder={ISSUE_PLACEHOLDER}/>
            </FieldsColumn>
             <FieldsColumn>
              <CurrentInput value={formValues?.name} onChange={onChangeField('name')} title={NAME_TITLE} placeholder={NAME_PLACEHOLDER}/>
              <CurrentInput value={formValues?.birth_date} onChange={onChangeField('birth_date')} title={DOB_TITLE} placeholder={DOB_PLACEHOLDER}/>
              <CurrentInput value={formValues?.code} onChange={onChangeField('code')} title={CODE_TITLE} placeholder={CODE_PLACEHOLDER}/>
            </FieldsColumn>
            <FieldsColumn>
              <CurrentInput value={formValues?.lastname} onChange={onChangeField('lastname')} title={LASTNAME_TITLE} placeholder={LASTNAME_PLACEHOLDER}/>
              <CurrentInput value={formValues?.birth_place} onChange={onChangeField('birth_place')} title={PLACE_TITLE} placeholder={PLACE_PLACEHOLDER}/>
            </FieldsColumn>
          </FieldsRow>
          <LongFieldsRow>
            <CurrentInput value={formValues?.reg_org} onChange={onChangeField('reg_org')} title={ORG_TITLE} placeholder={ORG_PLACEHOLDER}/>
            <CurrentInput value={formValues?.reg_adress} onChange={onChangeField('reg_address')} title={REG_TITLE} placeholder={REG_PLACEHOLDER}/>
          </LongFieldsRow>
          <LineTwo />
          <Buttons>
            <CurrentButton onSubmit={onSubmit}>{NEXT}</CurrentButton>
            <CurrentAuxButton onClick={() => onClose()}>{CANCEL}</CurrentAuxButton>
          </Buttons>
          <FileInput type='file' id='photo_file_upload' onChange={uploadChangeFoto} accept='image/x-png,image/gif,image/jpeg' />
          <FileInput type='file' id='reg_file_upload' onChange={uploadChangeReg} accept="image/x-png,image/gif,image/jpeg" />
        </Window>
      </Container>
    </Cloak>
  );
};

export default connectFunctionalComponent(Documents, {
  form: wizardDocumentFormHandler
});
