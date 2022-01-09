import React from 'react';
import { TSortedBy, TOnClick } from './ListTypes';
import { TCarItem } from '../Detail/DetailTypes';
import { ThCell } from '../parts/ThCell';
import { Table } from '../lib/Table/Table';

const getTable = (items: TCarItem[], getButtons: Function, onClick: TOnClick, sortedBy: TSortedBy) => {
  return (
    <Table className="table table_striped table_bordered table_hover">
      <thead>
        <tr>
          <ThCell id="manufacturer" title="Производитель" index={1} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="model" title="Модель" index={2} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="production" title="Дата выпуска" index={3} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="color" title="Цвет" index={4} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="power" title="Мощность" index={5} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="mileage" title="Пробег" index={6} onClick={onClick} sortedBy={sortedBy} />
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((o: TCarItem, index: number) => {
          return (
            <tr key={index}>
              <td>{o.manufacturer}</td>
              <td>{o.model}</td>
              <td>{o.production}</td>
              <td>{o.color}</td>
              <td>{o.power}</td>
              <td>{o.mileage}</td>
              <td style={{ width: 10 + 'rem' }}>{getButtons(String(o.id))}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default getTable;
