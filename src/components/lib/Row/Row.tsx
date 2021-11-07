import React from 'react';
import styled from 'styled-components';

type TRowProps = {
  children?: React.ReactNode;
  id?: string;
};

export const Row = ({ children, id }: TRowProps) => {
  return <StyledRow id={id}>{children}</StyledRow>;
};

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  * {
    flex-shrink: 0;
    max-width: 100%;
  }
`;
