import React, { ChangeEvent, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useDetailOfItem } from "../../components/Detail/DetailOfItem";
import Cars from "../cars";
import Alerts from "../../components/lib/alert/Alerts";
import Card from "../../components/lib/Card/Card";
import { Row } from "../../components/lib/Row/Row";
import { Button } from "../../components/lib/Button/Button";
import Form from "../../components/lib/Form/Form";
import GenderSelect from "../../components/parts/GenderSelect";
import { TooltipContent } from "../../components/lib/Tooltip";
import {
    TOwnerItem,
    TDetailOfItemsProps,
    TGender,
    GENDER,
    TCarItem,
} from "../../components/Detail/DetailTypes";
import { TItemFunctions } from "../../components/List/ListTypes";
import { useDetailFunctions } from "../../components/Detail/useDetailFunctions";
import { getErrors, digitsOnly, redirect } from "../../components/lib/utils/utils";
import { AlertContext } from "../../components/lib/alert/AlertContext";
import { useListFunctions } from "../../components/List/useListFunctions";
import { TextField } from "../../components/lib/input/TextField";
import { TextArea } from "../../components/lib/input/TextArea";

const OwnerDetail = () => {
    const functions = useDetailFunctions("owner");
    const carFunctions = useListFunctions("cars");
    const history = useHistory();
    const context = useContext(AlertContext);

    const detailUtils = useDetailOfItem<TOwnerItem>({
        functions,
    } as TDetailOfItemsProps<TOwnerItem>);

    const btnNewCarClick = async () => {
        if (!detailUtils.item) return;
        try {
            const res = await axios.post(functions.url, {
                btn_add: "",
                url: window.location.pathname,
                owner_pk: detailUtils.item!.id,
            });
            redirect(history, res.data.redirect);
        } catch (err) {
            context.setAlerts({ messages: getErrors(err.response.data) });
        }
    };

    const stringToGender = (value: string): TGender => {
        if (value.startsWith(GENDER.FEMALE)) return GENDER.FEMALE;
        return GENDER.MALE;
    };

    const changeGender = (e: ChangeEvent<HTMLInputElement>) => {
        const item = { ...detailUtils.item, gender: stringToGender(e.target.value) };
        // console.log('OwnerDetail.changeGender.item', e.target.value, item);
        detailUtils.setItem(item);
    };

    useEffect(() => detailUtils.getItem(), []);

    return (
        <div>
            <Alerts />
            <Card>
                <Card.Title>Автовладелец</Card.Title>
                <Card.Body>
                    <Row>
                        <div className="form">
                            <Form.Group className="form__group form__group_owner-input">
                                <TextField
                                    select={false}
                                    name="name"
                                    value={detailUtils.item?.name ?? ""}
                                    placeholder="Имя"
                                    onChange={detailUtils.changeItem}
                                />
                                <TextField
                                    name="patronymic"
                                    value={detailUtils.item?.patronymic ?? ""}
                                    placeholder="Отчество"
                                    onChange={detailUtils.changeItem}
                                />
                                <TextField
                                    name="last_name"
                                    type="text"
                                    placeholder="Фамилия"
                                    value={detailUtils.item?.last_name ?? ""}
                                    onChange={detailUtils.changeItem}
                                />
                                <GenderSelect
                                    name="gender"
                                    checkValue={detailUtils.item!.gender}
                                    onChange={changeGender}
                                />
                                <TextField
                                    name="age"
                                    maxLength={3}
                                    placeholder="Возраст"
                                    value={detailUtils.item?.age ?? ""}
                                    onChange={detailUtils.changeItem}
                                    onKeyPress={digitsOnly}
                                />
                            </Form.Group>
                            <Form.Group className="form__group form__group_owner-comment">
                                <TextArea
                                    rows={14}
                                    value={detailUtils.item?.comment ?? ""}
                                    name="comment"
                                    placeholder="Комментарий"
                                    onChange={detailUtils.changeItem}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <hr />
                    <Button
                        className="btn-primary btn-primary_owner-save tooltip"
                        variant="primary"
                        onClick={detailUtils.saveItem}
                    >
                        <TooltipContent>
                            Сохранить&nbsp;информацию&nbsp;об&nbsp;автовладельце
                        </TooltipContent>
                        Сохранить
                    </Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Title>Автомобили</Card.Title>
                <Card.Header>
                    <Row>
                        <Button
                            variant="primary"
                            className="btn-primary btn-primary_owner-add-car tooltip"
                            name="add_car"
                            onClick={btnNewCarClick}
                            disabled={detailUtils.item!.id < 0}
                        >
                            <TooltipContent>Добавить&nbsp;автомобиль</TooltipContent>
                            Добавить автомобиль
                        </Button>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Cars
                        withAlerts={false}
                        owner={detailUtils.item?.id}
                        functions={carFunctions as TItemFunctions<TCarItem>}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};

export default OwnerDetail;
