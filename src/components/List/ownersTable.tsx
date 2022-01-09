import React from 'react';
import { TSortedBy, TOnClick } from './ListTypes';
import { ThCell } from '../parts/ThCell';
import { Table } from '../lib/Table/Table';
import { TOwnerItem } from '../Detail/DetailTypes';

const getTable = (items: TOwnerItem[], getButtons: Function, onClick: TOnClick, sortedBy: TSortedBy) => {
  return (
    <Table className="table table_striped table_bordered table_hover">
      <thead>
        <tr>
          <ThCell id="last_name" title="Фамилия" index={1} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="name" title="Имя" index={2} onClick={onClick} sortedBy={sortedBy} />
          <th id="patronymic">Отчество</th>
          <ThCell id="gender" title="Пол" index={4} onClick={onClick} sortedBy={sortedBy} />
          <ThCell id="age" title="Возраст" index={4} onClick={onClick} sortedBy={sortedBy} />
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((o: TOwnerItem, index: number) => {
          return (
            <tr key={index}>
              <td>{o.last_name}</td>
              <td>{o.name}</td>
              <td>{o.patronymic}</td>
              <td>{o.gender === 'f' ? 'Жен' : 'Муж'}</td>
              <td>{o.age}</td>
              <td style={{ width: 100 + 'px' }}>{getButtons(String(o.id))}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default getTable;
