import React, { ChangeEvent, useContext, useEffect } from 'react';
import { useItemFunctions } from '../../components/Detail/useItemFunctions';
import Cars from '../cars';
import Alerts from '../../components/lib/alert/Alerts';
import Card from '../../components/lib/Card/Card';
import { Row } from '../../components/lib/Row/Row';
import { Button } from '../../components/lib/Button/Button';
import Form from '../../components/lib/Form/Form';
import GenderSelect from '../../components/lib/GenderSelect/GenderSelect';
import { TooltipContent } from '../../components/lib/Tooltip';
import { TOwnerItem, TItemsProps, TGender, E_GENDER, TCarItem, E_DETAIL } from '../../components/Detail/DetailTypes';
import { TItemFunctions, E_LIST } from '../../components/List/ListTypes';
import useItemInfo, { OWNER_URL_API } from '../../components/Detail/useItemInfo';
import { getErrors, digitsOnly, redirect } from '../../components/lib/utils/utils';
import { useListFunctions } from '../../components/List/useListFunctions';
import { TextField } from '../../components/lib/input/TextField';
import { TextArea } from '../../components/lib/input/TextArea';
import api from '../api/api';
import { useRouter } from 'next/router';
import { useAlerts } from '../../components/lib/alert/AlertContext';
import { observer } from 'mobx-react-lite';
import useItemStore from '../../store/useItemStore';

const OwnerDetail = observer(() => {
    // const itemInfo = useItemInfo(E_DETAIL.OWNER);
    // const carFunctions = useListFunctions(E_LIST.CARS);
    const history = useRouter();
    const context = useAlerts();

    // const detailUtils = useItemFunctions<TOwnerItem>({
    //     itemInfo,
    // } as TItemsProps<TOwnerItem>);

    const itemStore = useItemStore<TOwnerItem>(E_DETAIL.OWNER);
    const { item, loadItem, saveItem, changeItemData } = itemStore;
    const changeItem = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void =>
        changeItemData(e.target.name, e.target.value);

    const btnNewCarClick = async () => {
        if (!item) return;
        try {
            const res = await api.queryServer(OWNER_URL_API, {
                btn_add: '',
                url: window.location.pathname,
                owner_pk: item!.id,
            });
            redirect(history, res.data.redirect);
        } catch (e: any) {
            context.setAlerts({ messages: getErrors(e.response.data) });
        }
    };

    const stringToGender = (value: string): TGender => {
        if (value.startsWith(E_GENDER.FEMALE)) return E_GENDER.FEMALE;
        return E_GENDER.MALE;
    };

    const changeGender = (e: ChangeEvent<HTMLInputElement>) => {
        changeItemData('gender', stringToGender(e.target.value));
        // console.log('OwnerDetail.changeGender.item', e.target.value, item);
    };

    useEffect(() => {
        loadItem();
    }, []);

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
                                    value={item?.name ?? ''}
                                    placeholder="Имя"
                                    onChange={changeItem}
                                />
                                <TextField
                                    name="patronymic"
                                    value={item?.patronymic ?? ''}
                                    placeholder="Отчество"
                                    onChange={changeItem}
                                />
                                <TextField
                                    name="last_name"
                                    type="text"
                                    placeholder="Фамилия"
                                    value={item?.last_name ?? ''}
                                    onChange={changeItem}
                                />
                                <GenderSelect name="gender" checkValue={item!.gender} onChange={changeGender} />
                                <TextField
                                    name="age"
                                    maxLength={3}
                                    placeholder="Возраст"
                                    value={item?.age ?? ''}
                                    onChange={changeItem}
                                    onKeyPress={digitsOnly}
                                />
                            </Form.Group>
                            <Form.Group className="form__group form__group_owner-comment">
                                <TextArea
                                    rows={14}
                                    value={item.comment ?? ''}
                                    name="comment"
                                    placeholder="Комментарий"
                                    onChange={changeItem}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <hr />
                    <Button className="btn-primary btn-primary_owner-save tooltip" variant="primary" onClick={saveItem}>
                        <TooltipContent>Сохранить&nbsp;информацию&nbsp;об&nbsp;автовладельце</TooltipContent>
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
                            disabled={item!.id < 0}
                        >
                            <TooltipContent>Добавить&nbsp;автомобиль</TooltipContent>
                            Добавить автомобиль
                        </Button>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Cars withAlerts={false} owner={item?.id} />
                </Card.Body>
            </Card>
        </div>
    );
});

export default OwnerDetail;
