import React, { useEffect, useRef } from 'react';

type TModalPartsProps = {
  id?: string;
  className?: string;
  children?: any;
};

type TModalHeaderProps = { closeButton?: boolean } & TModalPartsProps;

let baseClass = 'modal-dialog';

const ModalHeader = (props: TModalHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const classList = ref.current!.classList;
  //   console.log('ModalHeader.baseClass', baseClass);
  // });

  return (
    <div ref={ref} className={`${baseClass}__header`} id={props.id}>
      {props.children}
    </div>
  );
};

const ModalTitle = (props: TModalPartsProps) => {
  //useEffect(() => console.log('Modal.Title', baseClass));
  return (
    <div className={`${baseClass}__title`} id={props.id}>
      <h4>{props.children}</h4>
    </div>
  );
};

const ModalBody = (props: TModalPartsProps) => {
  //useEffect(() => console.log('Modal.Body', baseClass));
  return (
    <div className={`${baseClass}__body`} id={props.id}>
      {props.children}
    </div>
  );
};

const ModalFooter = (props: TModalPartsProps) => {
  //useEffect(() => console.log('Modal.Footer', baseClass));
  return (
    <div className={`${baseClass}__footer`} id={props.id}>
      {props.children}
    </div>
  );
};

type TModalProps = {
  show?: boolean;
  id?: string;
  baseClassName: string;
  children?: any;
  onHide: any;
};

type TModalAddOns = {
  Header: React.FC<TModalHeaderProps>;
  Title: React.FC<TModalPartsProps>;
  Body: React.FC<TModalPartsProps>;
  Footer: React.FC<TModalPartsProps>;
};

const Modal = (props: TModalProps) => {
  const setBaseClass = (): void => {
    baseClass = props.baseClassName;
  };
  useEffect(setBaseClass, []);
  const changeShowStatus = () => {
    const $body = document.querySelector('body')!;
    const $modal = document.querySelector(`.${props.baseClassName}`)! as HTMLElement;
    const $modalBackdrop = document.querySelector(`.${props.baseClassName}__backdrop`)! as HTMLElement;
    const $dialog = document.querySelector(`.${props.baseClassName}__dialog`) as HTMLElement;
    //console.log('Modal.modal', $modal);
    if (props.show) {
      $body.classList.add('body-modal-open');
      $modalBackdrop.classList.add(`${props.baseClassName}__backdrop_show`);
      $modal.classList.add(`${props.baseClassName}_show`);
      $dialog.classList.add(`${props.baseClassName}__dialog_show`);
    } else {
      $body.classList.remove('body-modal-open');
      $modalBackdrop.classList.remove(`${props.baseClassName}__backdrop_show`);
      $modal.classList.remove(`${props.baseClassName}_show`);
      $dialog.classList.remove(`${props.baseClassName}__dialog_show`);
    }
  };
  useEffect(changeShowStatus, [props.show]);

  return (
    <>
      <div id={props.id} className={`${props.baseClassName}__backdrop`}></div>
      <div id={props.id} className={props.baseClassName}>
        <div className={`${props.baseClassName}__dialog`}>
          <div id={props.id} className={`${props.baseClassName}__children`}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

type TModal = typeof Modal & TModalAddOns;
Object.assign(Modal, {
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
});
export default Modal as TModal;
