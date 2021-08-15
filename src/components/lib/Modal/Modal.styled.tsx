import React from 'react';
import * as Styled from './Modal.styled.elements';
import { Portal } from '../Portal/Portal';

type TModalProps = {
  onClose: () => void;
  width?: string;
  zIndex?: string;
  mobMarg?: boolean;
  close?: boolean;
  nBr?: boolean;
  children?: any;
};

type TModalTitleProps = { children?: any };
type TModalHeaderProps = { children?: any };
type TModalBodyProps = { children?: any };
type TModalFooterProps = { children?: any };

export const Modal = ({
  children,
  onClose,
  width,
  zIndex = '99999',
  mobMarg,
  close,
  nBr,
}: TModalProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <Styled.ModalContainer zIndex={zIndex} onClick={handleContainerClick}>
        {/* <Styled.Center onClick={handleContainerClick}> */}
        <Styled.ModalComponent width={width} mobMarg={mobMarg}>
          <Styled.ModalComponentInner nBr={nBr}>
            {close && (
              <span className="close" onClick={onClose}>
                &times;
              </span>
            )}
            {children}
          </Styled.ModalComponentInner>
        </Styled.ModalComponent>
        {/* </Styled.Center> */}
      </Styled.ModalContainer>
    </Portal>
  );
};

export const ModalTitle = ({ children }: TModalTitleProps) => {
  return <Styled.ModalTitle>{children}</Styled.ModalTitle>;
};

export const ModalHeader = ({ children }: TModalHeaderProps) => {
  return <Styled.ModalHeader>{children}</Styled.ModalHeader>;
};
export const ModalBody = ({ children }: TModalBodyProps) => {
  return <Styled.ModalBody>{children}</Styled.ModalBody>;
};
export const ModalFooter = ({ children }: TModalFooterProps) => {
  return <Styled.ModalFooter>{children}</Styled.ModalFooter>;
};
