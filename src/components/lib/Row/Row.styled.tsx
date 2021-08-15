import React from 'react';
import styled from 'styled-components';

type TRowProps = {
  children?: React.ReactNode;
  id?: string;
};

// export const Row = ({ children, className, id } : TRowProps) => {
//   return (
//     <div className={className ? className : 'row'} id={id}>
//       {children}
//     </div>
//   );
// };

export const Row = styled.div<TRowProps>`
  display: flex;
  align-items: center;
  width: 100%;
  * {
    flex-shrink: 0;
    max-width: 100%;
  }
`;

export const RowNoWrap = styled(Row)`
  flex-wrap: nowrap;
`;

export const RowWrap = styled(Row)`
  flex-wrap: wrap;
`;
