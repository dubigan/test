import React from 'react';

type TTableProps = {
  className?: string;
  children: React.ReactNode;
};

export const Table = ({ children, className }: TTableProps) => {
  return <table className={className ? className : 'table'}>{children}</table>;
};
