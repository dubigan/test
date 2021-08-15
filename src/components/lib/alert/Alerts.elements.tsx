import styled from 'styled-components';
import { TAlertProps } from './AlertTypes';

export const Container = styled.div`
  position: absolute;
  z-index: 1000;
  margin: 0 auto;
  left: 35%;
`;

export const Alert = styled.div<TAlertProps>`
  padding: 1rem;
  margin-bottom: 0.8rem;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  box-shadow: ${props => (props.shadow ? '1px 4px 4px rgba(0, 0, 0, 0.8)' : 'none')};
  background-color: ${props => (props.type === 'danger' ? '#dc3545' : '')};
  background-color: ${props => (props.type === 'error' ? '#dc3545' : '')};
  background-color: ${props => (props.type === 'success' ? '#198754' : '')};
  background-color: ${props => (props.type === 'info' ? '#0dcaf0' : '')};
  background-color: ${props => (props.type === 'warning' ? '#ffc107' : '')};
`;
