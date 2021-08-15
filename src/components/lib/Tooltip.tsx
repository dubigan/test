import React from 'react';

type TTooltipContentProps = {
  children?: React.ReactNode;
  className?: string;
};

export const TooltipContent = ({ children, className }: TTooltipContentProps) => {
  return <div className={className ? className : 'tooltip__content'}>{children}</div>;
};

type TTooltipProps = {
  children?: React.ReactNode;
  tooltip: any;
};

export const Tooltip = ({ tooltip, children }: TTooltipProps) => {
  return (
    <div className="tooltip">
      <TooltipContent>{tooltip}</TooltipContent>
      {children}
    </div>
  );
};
