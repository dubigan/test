import React from "react";
import { TooltipContent } from "../lib/Tooltip";
import { Row } from "../lib/Row/Row";
import { TSortedBy } from "../List/ListTypes";

export type ThCellProps = {
    id?: string;
    title?: string;
    index?: number;
    sortedBy?: TSortedBy;
    onClick?:
        | ((event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => void)
        | undefined;
};

const upArrow = "\u2191";
//downArrow = '&#x0225C;';
const downArrow = "\u2193";

const arrow = (direction: "asc" | "desc" | undefined) =>
    direction === "asc" ? upArrow : downArrow;

export const ThCell = ({ id, title, index, onClick, sortedBy }: ThCellProps) => {
    return (
        <th className="tooltip" id={id} onClick={onClick} key={index}>
            <TooltipContent>Нажмите&nbsp;для&nbsp;сортировки</TooltipContent>
            <Row id={id} className="sorted-row">
                {sortedBy?.name === id && <div id={id}>{arrow(sortedBy?.direction)}</div>}{" "}
                <div id={id} className="sorted-row__text">
                    {title}
                </div>
            </Row>
        </th>
    );
};
