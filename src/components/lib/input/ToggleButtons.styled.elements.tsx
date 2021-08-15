import styled from 'styled-components';
import { RowNoWrap } from '../Row/Row.styled';
import { BtnOutlinePrimary } from '../Button/Button.styled';

export const Container = styled(RowNoWrap)`
  padding: 0px;
  margin: 0 auto 2rem;
  border-style: none;
  justify-content: space-between;
  position: relative;
  width: 90%;
`;

export const Button = styled(BtnOutlinePrimary)`
    // @include buttons.btn-outline-primary;
    // @include width.size(5.9);
    text-align: center;
    width: 49.5%;
    margin: 0px;
    &:focus,
    &:active {
      border-color: #0d6efd
    }
    &.active {
      color: white;
      background-color: #0d6efd;
      border-color: #0d6efd;
    }

  }
`;

export const Input = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
`;
