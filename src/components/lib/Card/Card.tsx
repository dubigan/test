import React from 'react';
import { JsxElement } from 'typescript';

type TCardProps = {
  children?: any;
  className?: string;
};

const CardHeader = ({ children, className }: TCardProps) => {
  return <div className={className ? className : 'card__header'}>{children}</div>;
};

const CardTitle = ({ children, className }: TCardProps) => {
  return <div className={className ? className : 'card__title'}>{children}</div>;
};

const CardBody = ({ children, className }: TCardProps) => {
  return <div className={className ? className : 'card__body'}>{children}</div>;
};

const CardFooter = ({ children, className }: TCardProps) => {
  return <div className={className ? className : 'card__footer'}>{children}</div>;
};

type TCard = React.FC<TCardProps> & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

// type TCard = JSX.Element & {
//   Header: typeof CardHeader;
//   Title: typeof CardTitle;
//   Body: typeof CardBody;
//   Footer: typeof CardFooter;
// };

const Card: Partial<TCard> = ({ children, className }: TCardProps) => {
  return <div className={className ? className : 'card'}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;

export default Card as TCard;
