import React, {SyntheticEvent} from 'react';
import styled from 'styled-components';

import {connectFunctionalComponent} from "../lib/ducks/connect";
import {WizardDoc, WizardDocStatus, WizardDocType} from '../models';
import {wizardUploadBillHandler, wizardPassportModal} from "../ducks/wizard";
import Documents from '../components/Documents';

const OK_ICON = `${process.env.PUBLIC_URL}/assets/docs_ok_icon.svg`,
      NO_ICON = `${process.env.PUBLIC_URL}/assets/docs_no_icon.svg`,
      CLIP_ICON = `${process.env.PUBLIC_URL}/assets/clip.svg`;

const UPLOAD_TEXT = 'Прикрепить';

const Container = styled.div`
  height: 291px;
  background: rgba(241, 241, 241, 0.5);
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: stretch;

  @media (max-width: 768px) {
    width: auto;
    height: auto;
    border-left: none;
    border-right: none;
    border-radius: 0;
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Header = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: stretch;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 18px;
    align-items: flex-start;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const HeaderIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const HeaderText = styled.div`
  margin-left: 18px;
  flex: 1;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  color: #000C25;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height:19px;
  }
`;

const List = styled.div`
  margin: 25px 0 30px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 768px) {
    margin: 15px 0 0 0;
  }
`;

const ListItem = styled.div`
  height: 46px;
  background: #FFFFFF;
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: stretch;
  align-items: center;

  &:not(:first-child) {
    margin-top: 16px;

    @media (max-width: 768px) {
      margin-top: 10px;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    border-radius: 0;
    flex-direction: column;
    align-items: flex-start;
  }
`;

interface ItemPointProps {
  valid: boolean;
};

const ItemPoint = styled.div<ItemPointProps>`
  margin-left: 22px;
  width: 6px;
  height: 6px;
  background: ${(props: ItemPointProps) => props.valid ? '#02B549' : '#f30b0b'};
  border-radius: 3px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ItemText = styled.div`
  flex: 1;
  margin-left: 14px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #000000;

  @media (max-width: 768px) {
    margin-top: 15px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const ItemTools = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-top: 9px;
    display: flex;
    justify-content: stretch;
  }
`;

const ItemClipIcon = styled.img`
  width: 14px;
  height: 14px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const ItemUploadText = styled.div`
  margin: 0 20px 0 10px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #5092E1;
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 0 20px 17px 10px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

export interface DocsUploadProps {
  status: WizardDocStatus;
  title: string;
  docs: WizardDoc[];
  type: WizardDocType;
};

interface DocsUploadViewProps extends DocsUploadProps {
  className?: string;
  formChange: (state: any) => void;
  submit: () => void;
  isPassport: boolean;
  open_passport: () => void;
  close_passport: () => void;
}

const getDocsIcon = (status: WizardDocStatus) => {
  if(status === WizardDocStatus.None) return (<HeaderIcon src={NO_ICON} />);
  if(status === WizardDocStatus.Done) return (<HeaderIcon src={OK_ICON} />);
  return (<></>);
}

const getDocPoint = (status: WizardDocStatus) => {
  if(status === WizardDocStatus.None) return false;
  return true;
}

const hideBodyScroll = (isHideScroll: boolean) => {
  if(isHideScroll) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';
};

const DocsUpload = (props: DocsUploadViewProps) => {
  hideBodyScroll(props.isPassport);

  const uploadHandler = (item: WizardDoc) => {
    if(item.type === WizardDocType.Bill)
      document.getElementById('wizard_file_upload').click();
    if(item.type === WizardDocType.Mvp)
      props.open_passport();
  };

  const onCloseDocuments = () => {
    props.close_passport();
  };

  const uploadChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const files: FileList = event.currentTarget.files;
    if(files.length > 0) {
      props.formChange({files});
      window.setTimeout(() => {
        props.submit();
      }, 0);
    }
  };

  return (
    <Container className={props.className}>
      <Content>
        <Header>
          {getDocsIcon(props.status)}
          <HeaderText>{props.title}</HeaderText>
        </Header>
        <List>
          {props.docs.map((item: WizardDoc, index: number) => (
            <ListItem key={index}>
              <ItemPoint valid={getDocPoint(item.status)} />
              <ItemText>{item.title}</ItemText>
              <ItemTools>
                <ItemClipIcon src={CLIP_ICON} />
                <ItemUploadText onClick={() => uploadHandler(item)}>{UPLOAD_TEXT}</ItemUploadText>
              </ItemTools>
            </ListItem>
          ))}
        </List>
        <FileInput type='file' id='wizard_file_upload' onChange={uploadChange} accept='.txt'/>
      </Content>
      {props.isPassport && props.type === WizardDocType.Mvp &&
        <Documents
          // onClose={onCloseDocuments}
        />
      }
    </Container>
  );
};

export default connectFunctionalComponent(DocsUpload, {
  selectors: {
    isPassport: wizardPassportModal.isOpen
  },
  form: wizardUploadBillHandler,
  modals: {
    passport: wizardPassportModal
  }
});
