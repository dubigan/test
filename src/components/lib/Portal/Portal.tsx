import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: any) => {
  const div = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);
  return createPortal(children, div);
};
