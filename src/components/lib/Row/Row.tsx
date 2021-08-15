import React from 'react';

interface IRowProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const Row: React.FC<IRowProps> = ({ children, className, id }) => {
  return (
    <div className={className ? className : 'row'} id={id}>
      {children}
    </div>
  );
};
