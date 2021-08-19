import React from "react";
import { TSortedBy, TListFunctions, TOnClick, TListType } from "./ListTypes";
import { TCarItem, TOwnerItem } from "../Detail/DetailTypes";
import { ThCell } from "../parts/ThCell";
import { Table } from "../lib/Table";

const functions: TListFunctions = {
    cars: {
        url: "/api/cars/",
        detailUrl: "/car",
        idKey: "car_pk",
        tooltipPlace: "bottom",
        nameOfItem: "Автомобиль",
        addButton: false,

        itemInfo: (item: TCarItem) => [item.manufacturer, item.model].join(" "),
        getTable: function getTable(
            items: TCarItem[],
            getButtons: Function,
            onClick: TOnClick,
            sortedBy: TSortedBy
        ) {
            return (
                <Table className="table table_striped table_bordered table_hover">
                    <thead>
                        <tr>
                            <ThCell
                                id="manufacturer"
                                title="Производитель"
                                index={1}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="model"
                                title="Модель"
                                index={2}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="production"
                                title="Дата выпуска"
                                index={3}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="color"
                                title="Цвет"
                                index={4}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="power"
                                title="Мощность"
                                index={5}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="mileage"
                                title="Пробег"
                                index={6}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
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
                                    <td style={{ width: 10 + "rem" }}>
                                        {getButtons(String(o.id))}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            );
        },

        getDefaultSortedBy: () =>
            ({
                name: "model",
                direction: "asc",
            } as TSortedBy),
    },

    owners: {
        url: "/api/owners/",
        detailUrl: "/owner",
        idKey: "owner_pk",
        tooltipPlace: "bottom",
        nameOfItem: "Автовладелец",
        addButton: true,

        itemInfo: (item: TOwnerItem) => [item.last_name, item.name, item.patronymic].join(" "),
        getTable: function getTable(
            items: TOwnerItem[],
            getButtons: Function,
            onClick: TOnClick,
            sortedBy: TSortedBy
        ) {
            return (
                <Table className="table table_striped table_bordered table_hover">
                    <thead>
                        <tr>
                            <ThCell
                                id="last_name"
                                title="Фамилия"
                                index={1}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="name"
                                title="Имя"
                                index={2}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <th id="patronymic">Отчество</th>
                            <ThCell
                                id="gender"
                                title="Пол"
                                index={4}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
                            <ThCell
                                id="age"
                                title="Возраст"
                                index={4}
                                onClick={onClick}
                                sortedBy={sortedBy}
                            />
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
                                    <td>{o.gender === "f" ? "Жен" : "Муж"}</td>
                                    <td>{o.age}</td>
                                    <td style={{ width: 100 + "px" }}>
                                        {getButtons(String(o.id))}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            );
        },

        getDefaultSortedBy: () =>
            ({
                name: "last_name",
                direction: "asc",
            } as TSortedBy),
    },
};

export const useListFunctions = (listType: TListType) => {
    return functions[listType];
};
