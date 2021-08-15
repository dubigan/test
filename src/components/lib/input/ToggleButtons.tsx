import React from 'react';

type TToggleButton = {
  name: string | undefined;
  value: string;
  className?: string;
  inputClassName?: string;
  checked: boolean;
  onChange: React.ChangeEventHandler;
};

export const ToggleButton: React.FC<TToggleButton> = ({ children, name, value, className, inputClassName, checked, onChange }) => {
  const clName = [className ? className : 'toggleButtonGroup__label'];
  if (checked) {
    clName.push('active');
  }
  return (
    <label className={clName.join(' ')}>
      <input
        className={inputClassName ? inputClassName : 'toggleButtonGroup__input'}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {children}
    </label>
  );
};

export type TToggleValue = {
  label: string;
  value: string;
};

export type TToggleValues = Array<TToggleValue>;

export type TToggleButtonGroupProps = {
  name?: string | undefined;
  values?: TToggleValues;
  checkValue: string;
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
  onChange: React.ChangeEventHandler;
};

export type TToggleButtonGroup = React.FC<TToggleButtonGroupProps> & { values: TToggleValues };

// values in form of [{label: 'label', value: value}, ...]
const ToggleButtonGroup: Partial<TToggleButtonGroup> = (props: TToggleButtonGroupProps) => {
  return (
    <div className={props.className ? props.className : 'toggleButtonGroup'}>
      {props.values
        ? props.values.map((value: TToggleValue, index: number) => {
            //const checked = props.checkValue === value.value;
            //console.log('ToggleButtonGroup', props.checkValue, value.value, checked);

            return (
              <ToggleButton
                value={value.value}
                name={props.name}
                className={props.buttonClassName}
                inputClassName={props.inputClassName}
                onChange={props.onChange}
                key={index}
                checked={props.checkValue === value.value}
              >
                {value.label}
              </ToggleButton>
            );
          })
        : ''}
    </div>
  );
};

ToggleButtonGroup.values = [];
// ToggleButton.defaultProps = {
//   className: 'toggleButtonGroup__input',
//   value: 'on',
// };

export default ToggleButtonGroup as TToggleButtonGroup;
