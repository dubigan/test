import React from 'react';
import styled, { css } from 'styled-components';
import { TooltipContent } from '../lib/Tooltip';
import { Row } from '../lib/Row/Row';
import { E_DIRECTION, TSortedBy } from '../List/ListTypes';

export type ThCellProps = {
  id?: string;
  title?: string;
  index?: number;
  sortedBy?: TSortedBy;
  onClick?: ((event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void) | undefined;
};

const upArrow = '\u2191';
//downArrow = '&#x0225C;';
const downArrow = '\u2193';

const arrow = (direction: E_DIRECTION | undefined) => (direction === E_DIRECTION.ASC ? upArrow : downArrow);

export const ThCell = ({ id, title, index, onClick, sortedBy }: ThCellProps) => {
  return (
    <SortedThCell id={id} onClick={onClick} key={index}>
      <TooltipContent>Нажмите&nbsp;для&nbsp;сортировки</TooltipContent>
      <Row id={id}>
        <SortedText id={id} sorted={sortedBy?.name === id} up={sortedBy?.direction === E_DIRECTION.ASC}>
          {title}
        </SortedText>
      </Row>
    </SortedThCell>
  );
};

const SortedThCell = styled.th`
  $root: &;
  position: relative;

  &__content {
    position: absolute;
    z-index: 1001;
    display: none;
    background-color: #000;
    color: #fff;
    padding: 5px;
    border-radius: 6px;
    font-size: 1.5rem;

    /* Position the tooltip text - see examples below! */
    //$width: 300px;
    $width: auto;
    width: $width;
    min-width: 12em;
    //min-height: 1.5em;
    bottom: 100%;
    left: 0;
    //text-wrap: none;
    //margin-left: -$width/2;
    margin: 1rem auto;
    &::after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -1rem;
      left: 30%;
      border-left: 0.8rem solid transparent;
      border-right: 0.8rem solid transparent;
      border-top: 1rem solid #000;
    }
    &_left {
      &::after {
        left: 80%;
      }
      left: -9em;
    }
    &_right {
      left: 100%;
    }
  }
  &:hover {
    #{$root}__content {
      display: block;
      animation: 0.5s linear bg-opacity;
    }
  }

  @keyframes bg-opacity {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

type TSorted = {
  sorted: boolean;
  up: boolean;
};

const SortedText = styled.div<TSorted>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.sorted &&
    css`
      &::before {
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        border-radius: 50%;
        content: '\u2193'; //url('svg/arrowdown.svg');
        transform: ${(props: TSorted) => (props.up ? 'rotate(180deg)' : '')};
        transition: transform 1s;
        margin-right: 0.5rem;
        // text-align: center;
      }
    `}
`;
