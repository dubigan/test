import React, { ChangeEvent, useState, useRef, FC } from 'react';

import * as Styled from './Select.styled';
import useOnClickOutside from '../hook/useOutsideHook';

type TSelectProps = {
  options: string[];
  arrow?: boolean;
};

export const Select = ({ options, arrow = false }: TSelectProps) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeList, setActiveList] = useState(0);

  const ref = useRef(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any) => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  console.log(selectedOption);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeList === 0) {
        return;
      }
      setActiveList(activeList - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeList >= options.length - 1) {
        return setActiveList(0);
      }
      setActiveList(activeList + 1);
    } else if (e.key === 'Enter') {
      let value = options[activeList];
      onOptionClicked(value);
    }
  };

  return (
    <div>
      <Styled.DropDownContainer ref={ref}>
        <Styled.DropDownHeader tabIndex={0} onClick={toggling} onKeyDown={onKeyDown}>
          <Styled.DropDownHeaderContent>
            {selectedOption || options[0]}
            {arrow ? <Styled.Arrow src="../../../svg/arrowdown.svg" rotat={isOpen} /> : null}
          </Styled.DropDownHeaderContent>
          <span data-label="placehol"></span>
        </Styled.DropDownHeader>
        {isOpen && (
          <Styled.SelectList>
            {options.map((option, idx) => (
              <Styled.ListItem active={activeList === idx} onClick={() => onOptionClicked(option)} key={Math.random()}>
                <Styled.Text>{option}</Styled.Text>
                <Styled.Value>3000 THB</Styled.Value>
              </Styled.ListItem>
            ))}
          </Styled.SelectList>
        )}
      </Styled.DropDownContainer>
    </div>
  );
};
