import React, { useEffect } from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { useItemFunctions } from '../../components/Detail/useItemFunctions';
import Alerts from '../../components/lib/alert/Alerts';
import Card from '../../components/lib/Card/Card';
import { Row } from '../../components/lib/Row/Row';
import { Button } from '../../components/lib/Button/Button';
import Form from '../../components/lib/Form/Form';
import { TooltipContent } from '../../components/lib/Tooltip';
import {E_CAR_ITEM, E_DETAIL, TCarItem, TItemInfo, TItemsProps, TOwnerItem} from '../../components/Detail/DetailTypes';
import { digitsOnly } from '../../components/lib/utils/utils';
import { observer } from 'mobx-react-lite';

const CarDetail = observer(() => {
    const {loadItem, saveItem, changeItem, changeItemData, item} = useItemFunctions<TCarItem>(E_DETAIL.CAR)

    const saveItemWithBack = () => {
        return () => saveItem(true);
    }

    const changeDate = (date: Date | Date[]) => {
        //console.log("changeDate", date.toLocaleDateString("ru"));
        if (typeof date !== 'object') return;
        changeItemData(E_CAR_ITEM.PRODUCTION, (date as Date).toLocaleDateString('ru'));
    };

    const getDate = () => {
        if (item?.production) {
            const [day, month, year] = item!.production.split('.');
            //console.log("getDate", [day, month, year]);
            return new Date(+year, +month - 1, +day);
        }
        return new Date();
    };

    useEffect(() => {
        loadItem();
    }, []);

    return (
        <div>
            <Alerts />
            <Card>
                <Card.Title>Автомобиль</Card.Title>
                <Card.Body>
                    <Row>
                        <div className="form">
                            <Form.Group className="form__group form__group_car-input">
                                <Form.Group className="form__group form__group_horiz">
                                    <Form.Label className="form__label form__label_car-input">Производитель</Form.Label>
                                    <Form.Control
                                        className="form__control form__control_car-input"
                                        name="manufacturer"
                                        type="text"
                                        value={item?.manufacturer ?? ''}
                                        onChange={changeItem}
                                    />
                                </Form.Group>
                                <Form.Group className="form__group form__group_horiz">
                                    <Form.Label className="form__label form__label_car-input">Модель</Form.Label>
                                    <Form.Control
                                        className="form__control form__control_car-input"
                                        name="model"
                                        type="text"
                                        value={item?.model ?? ''}
                                        onChange={changeItem}
                                    />
                                </Form.Group>
                                <Form.Group className="form__group form__group_horiz">
                                    <Form.Label className="form__label form__label_car-input">Дата выпуска</Form.Label>
                                    <DatePicker
                                        className="form__control form__control_car-input"
                                        calendarClassName="border"
                                        format="dd.MM.yyyy"
                                        locale="ru"
                                        maxDate={new Date()}
                                        minDate={new Date(1900, 0, 1)}
                                        name="production"
                                        // showYearDropdown={true}
                                        onChange={changeDate}
                                        value={getDate()}
                                    />
                                </Form.Group>
                                {/* </OverlayTrigger> */}
                                <Form.Group className="form__group form__group_horiz">
                                    <Form.Label className="form__label form__label_car-input" name="color">
                                        Цвет
                                    </Form.Label>
                                    <Form.Control
                                        className="form__control form__control_car-input"
                                        name="color"
                                        type="text"
                                        value={item?.color ?? ''}
                                        onChange={changeItem}
                                    />
                                </Form.Group>
                                <Form.Group className="form__group form__group_horiz">
                                    <Form.Label className="form__label form__label_car-input" name="age">
                                        Мощность (л.с.)
                                    </Form.Label>
                                    <Form.Control
                                        className="form__control form__control_car-input"
                                        name="power"
                                        type="text"
                                        maxLength={3}
                                        value={item?.power ?? ''}
                                        onChange={changeItem}
                                        onKeyPress={digitsOnly}
                                    />
                                </Form.Group>
                                <Form.Group className="form__group form__group_horiz">
                                    <Form.Label className="form__label form__label_car-input" name="age">
                                        Пробег (км.)
                                    </Form.Label>
                                    <Form.Control
                                        className="form__control form__control_car-input"
                                        name="mileage"
                                        type="text"
                                        maxLength={10}
                                        value={item?.mileage ?? ''}
                                        onChange={changeItem}
                                        onKeyPress={digitsOnly}
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group className="form__group form__group_car-comment">
                                <Form.Label className="form__label form__label_car-comment">Комментарий</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    rows={8}
                                    value={item?.comment ?? ''}
                                    name="comment"
                                    onChange={changeItem}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <hr />
                    <Button className="btn-primary btn-primary_car-save tooltip" onClick={saveItemWithBack()}>
                        <TooltipContent>Сохранить информацию об автомобиле</TooltipContent>
                        Сохранить
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
});

export default CarDetail;
