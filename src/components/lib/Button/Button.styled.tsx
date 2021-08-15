import styled from "styled-components";

export type TButtonProps = {
    tooltip?: string;
    id?: string;
    shadow?: boolean;
    name?: string;
    value?: any;
    variant?: string;
    onClick?: (e: any) => void;
    disabled?: boolean;
    children?: any;
    type?: string;
    width?: string;
};

export const Button = styled.button<TButtonProps>`
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: $dark;
    background-color: transparent;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    margin: 0.375rem;
    font-size: 1.6rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-shadow: ${(props) => (props.shadow ? "1px 4px 4px rgba(0, 0, 0, 0.5)" : "none")};
    width: ${(props) => props.width};
    &:disabled {
        pointer-events: none;
        opacity: 0.65;
    }
    &:hover {
        transform: scale(1.03);
    }
`;

export const BtnPrimary = styled(Button)`
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
`;

export const BtnSecondary = styled(Button)`
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
`;

export const BtnDanger = styled(Button)`
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
`;

export const BtnOutlinePrimary = styled(Button)`
    color: #0d6efd;
    border-color: #0d6efd;
    // &:hover {
    //   color: #fff;
    //   background-color: #0d6efd;
    // }
`;
