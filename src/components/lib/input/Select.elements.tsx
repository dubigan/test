import styled, { css } from "styled-components";
// import { ReactComponent as Icon } from "../../../svg/arrowdown.svg";
import image from "next/image";

export const SelectList = styled.ul`
    list-style: none;
    background: #f8f8f8;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: absolute;
    right: 0;
    left: 0;
    top: 55px;
    z-index: 999;
    // @media (max-width: 992px) {
    //   top: 65px;
    // }
`;

export const ListItem = styled.li<{ active?: boolean }>`
    transition: 0.3s;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => (props.active ? "#f0f4f8" : "#fff")};
    cursor: pointer;
    &:focus,
    &:hover {
        background: #f0f4f8;
        border-radius: 0px 0px 4px 4px;
    }
`;

export const Text = styled.div`
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
`;

export const Value = styled.div`
    color: rgba(38, 50, 56, 0.5);
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
`;

export const DropDownContainer = styled.div`
    width: 100%;
    margin: 0 auto 20px;
    position: relative;
`;

export const DropDownHeader = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: relative;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.25px;
    padding: 15px;
    width: 100%;
    transition: 200ms ease-in-out;
    &:focus,
    &:focus-visible {
        outline: none;
        /* box-shadow: 0 0 0 2px blueviolet; */
        border-color: #8a2be2;
        span {
            &::before {
                color: #caa5ec;
            }
        }
    }
    span {
        &::after,
        &::before {
            position: absolute;
            transition: 200ms ease-in-out;
        }
        &::before {
            content: attr(data-label);
            left: 16px;
            top: 0;
            bottom: 0;
            margin: auto;
            pointer-events: none;
            height: 18px;
            font-size: 12px;
            line-height: 15px;
            color: rgba(38, 50, 56, 0.4);
            line-height: 1;
            transform: translateY(-25px);
            background-color: #e5e5e5;
            padding: 2px 4px;
        }
    }
    // @media (max-width: 992px) {
    //   background: #f2f2f2;
    //   border: 1px solid rgba(255, 255, 255, 0.5);
    //   -webkit-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    //   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    //   border-radius: 5px;
    //   padding: 20px;
    //   span {
    //     display: none;
    //   }
    // }
`;

export const DropDownHeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Arrow = styled(image)<{ rotat?: boolean }>`
    width: 12px;
    margin: auto 0;
    margin-right: 3px;
    transition: 0.3s;
    transform: ${(props) => (props.rotat ? "rotate(0deg)" : "rotate(-90deg)")};
`;
