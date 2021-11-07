import React, { ChangeEvent, FC } from 'react';
import * as Styled from './TextArea.styled';

type TProps = {
  // select?: boolean,
  // open?: boolean,
  value?: string | number;
  name?: string;
  rows?: number;
  // maxLength?: number,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  // onKeyPress?: (e: any) => void,
  placeholder?: string;
  // error?: boolean,
  helperText?: string;
  // type?: string,
};

export const TextArea = ({
  // select,
  name,
  value,
  rows,
  onChange,
  placeholder,
}: TProps) => {
  return (
    <Styled.Container>
      <Styled.Label>
        <Styled.TextArea name={name} rows={rows} onChange={onChange} value={value} required />
        <span data-label={placeholder}></span>
      </Styled.Label>
    </Styled.Container>
  );
};
