import React, { ChangeEvent, FC } from 'react';
import * as Styled from './TextField.styled';

type TProps = {
  select?: boolean;
  open?: boolean;
  value?: string | number;
  name?: string;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: any) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  type?: string;
};

export const TextField = ({
  select,
  name,
  value,
  onChange,
  open = false,
  placeholder,
  error,
  helperText,
  type = 'text',
  maxLength,
  onKeyPress,
}: TProps) => {
  return (
    <Styled.Container>
      <Styled.Label error={error}>
        <Styled.Input
          name={name}
          type={type}
          error={error}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
          onKeyPress={onKeyPress}
          required
        />
        <span data-label={placeholder}></span>
        {/* {select && <Styled.Icon open={open} />} */}
      </Styled.Label>
      {helperText && <Styled.ErrorText error={error}>{helperText}</Styled.ErrorText>}
    </Styled.Container>
  );
};
