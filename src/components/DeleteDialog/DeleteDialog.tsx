import React, { Component } from "react";
import { Modal, ModalTitle, ModalBody, ModalFooter, ModalHeader } from "../lib/Modal/Modal.styled";
import { Button, BtnDanger, BtnSecondary } from "../lib/Button/Button.styled";
import styled from "styled-components";

type TDeleteDialogProps<TItem> = {
    deleteItem: Function;
    itemToDelete: TItem;
    nameOfItem?: string;
    itemInfo?: Function;
    onClose: () => void;
};

const DeleteDialog = <TItem,>(props: TDeleteDialogProps<TItem>) => {
    const handleClose = (e: any) => {
        if (e) props.deleteItem(e.target.value);
        return props.deleteItem(false);
    };

    const getItemInfo = () => {
        return props.itemInfo && props.itemInfo(props.itemToDelete);
    };

    return (
        <Modal width="50%" close={true} onClose={props.onClose}>
            <ModalHeader>
                <ModalTitle>Удалить</ModalTitle>
            </ModalHeader>
            <hr />
            <ModalBody>
                <ModalBodyNameOfItem>{props.nameOfItem}:</ModalBodyNameOfItem>
                <ModalBodyName>{getItemInfo()}</ModalBodyName>
            </ModalBody>
            <hr />
            <ModalFooter>
                <BtnSecondary shadow={true} value={false} onClick={handleClose}>
                    Отмена
                </BtnSecondary>
                <BtnDanger shadow={true} value={true} onClick={handleClose}>
                    Удалить
                </BtnDanger>
            </ModalFooter>
        </Modal>
    );
};

const ModalBodyNameOfItem = styled.div`
    text-align: left;
    width: 40%;
    padding-left: 1rem;
`;

const ModalBodyName = styled.div`
    text-align: center;
    width: 60%;
    padding: 0 1rem;
`;

export default DeleteDialog;
