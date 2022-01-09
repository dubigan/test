import React, { useEffect } from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { useDetailOfItem } from '../../components/Detail/DetailOfItem';
import Alerts from '../../components/lib/alert/Alerts';
import Card from '../../components/lib/Card/Card';
import { Row } from '../../components/lib/Row/Row';
import { Button } from '../../components/lib/Button/Button';
import Form from '../../components/lib/Form/Form';
import { TooltipContent } from '../../components/lib/Tooltip';
import { E_DETAIL, TCarItem, TDetailItemFunctions, TDetailOfItemsProps } from '../../components/Detail/DetailTypes';
import { useDetailFunctions } from '../../components/Detail/useDetailFunctions';
import { digitsOnly } from '../../components/lib/utils/utils';

const CarDetail = () => {
  const functions = useDetailFunctions(E_DETAIL.CAR);

  const detailUtils = useDetailOfItem<TCarItem>({ functions } as TDetailOfItemsProps<TCarItem>);

  const changeDate = (date: Date | Date[]) => {
    //console.log("changeDate", date.toLocaleDateString("ru"));
    if (typeof date !== 'object') return;
    detailUtils.setItem({
      ...detailUtils.item,
      production: (date as Date).toLocaleDateString('ru'),
    });
  };

  const getDate = () => {
    if (detailUtils.item?.production) {
      const [day, month, year] = detailUtils.item!.production.split('.');
      //console.log("getDate", [day, month, year]);
      return new Date(+year, +month - 1, +day);
    }
    return new Date();
  };

  useEffect(() => detailUtils.getItem(), []);

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
                    value={detailUtils.item?.manufacturer}
                    onChange={detailUtils.changeItem}
                  />
                </Form.Group>
                <Form.Group className="form__group form__group_horiz">
                  <Form.Label className="form__label form__label_car-input">Модель</Form.Label>
                  <Form.Control
                    className="form__control form__control_car-input"
                    name="model"
                    type="text"
                    value={detailUtils.item?.model}
                    onChange={detailUtils.changeItem}
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
                    value={detailUtils.item?.color}
                    onChange={detailUtils.changeItem}
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
                    value={detailUtils.item?.power ? detailUtils.item!.power : ''}
                    onChange={detailUtils.changeItem}
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
                    value={detailUtils.item?.mileage ? detailUtils.item!.mileage : ''}
                    onChange={detailUtils.changeItem}
                    onKeyPress={digitsOnly}
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group className="form__group form__group_car-comment">
                <Form.Label className="form__label form__label_car-comment">Комментарий</Form.Label>
                <Form.Control
                  type="textarea"
                  rows={8}
                  value={detailUtils.item?.comment}
                  name="comment"
                  onChange={detailUtils.changeItem}
                />
              </Form.Group>
            </div>
          </Row>
          <hr />
          <Button className="btn-primary btn-primary_car-save tooltip" onClick={detailUtils.saveItem}>
            <TooltipContent>Сохранить информацию об автомобиле</TooltipContent>
            Сохранить
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarDetail;
