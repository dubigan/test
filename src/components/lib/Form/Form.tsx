import React, { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

type TFormProps = {
  children?: React.ReactNode;
  className?: string;
  baseClassName?: string;
  auxClassName?: string;
  action?: string;
  method?: 'post' | 'get';
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

type TFormControlProps = {
  className?: string;
  auxClassName?: string;
  name?: string;
  type?: string;
  value?: any;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>; // | ChangeEventHandler<HTMLTextAreaElement>;
  onClick?: MouseEventHandler;
  onKeyPress?: KeyboardEventHandler;
  disabled?: boolean;
  id?: string;
  readOnly?: boolean;
  children?: React.ReactNode;
};

type TFormLabelProps = {
  name?: string;
  className?: string;
  auxClassName?: string;
  children?: React.ReactNode;
};

let baseClass: string | undefined = 'form';

const getClassName = (className: string = '', auxClassName: string = '', suffix: string = '') => {
  if (className) return className;
  return `${baseClass}${suffix} ${auxClassName ?? ''}`;
};

const FormLabel = ({ children, className, auxClassName }: TFormLabelProps) => {
  return <div className={getClassName(className, auxClassName, '__label')}>{children}</div>;
};

const FormGroup = ({ children, className, auxClassName }: TFormProps) => {
  return <div className={getClassName(className, auxClassName, '__group')}>{children}</div>;
};

const FormControlSelect = (props: TFormControlProps) => {
  return (
    <select className={getClassName(props.className, props.auxClassName, '__select')} onChange={props.onChange}>
      {props.children}
    </select>
  );
};

const FormControl = (props: TFormControlProps) => {
  let type = 'text';
  if (props.type) type = props.type;
  switch (type) {
    case 'text':
      return (
        <input
          {...props}
          type="text"
          className={getClassName(props.className, props.auxClassName, '__text')}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          maxLength={props.maxLength ? +props.maxLength : undefined}
          onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
          //onClick={props.onClick}
          readOnly={!props.onChange}
        />
      );
    case 'textarea':
      return (
        <textarea
          {...props}
          className={getClassName(props.className, props.auxClassName, '__control')}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          maxLength={props.maxLength ? +props.maxLength : undefined}
          rows={props.rows ? +props.rows : undefined}
          onChange={props.onChange as ChangeEventHandler<HTMLTextAreaElement>}
          //onClick={props.onClick}
        />
      );
    case 'check':
      return (
        <input
          {...props}
          type="checkbox"
          className={getClassName(props.className, props.auxClassName, '__check')}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          maxLength={props.maxLength ? +props.maxLength : undefined}
          onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
          //onClick={props.onClick}
        />
      );

    case 'select':
      return (
        <FormControlSelect
          {...props}
          // className={getClassName(props.className, props.auxClassName, '__select')}
          // onChange={props.onChange}
        >
          {props.children}
        </FormControlSelect>
      );
    default:
      return <></>;
  }
};

// const Form: TForm = props => {
//   if (props.baseClassName) baseClass = props.baseClassName;
//   return (
//     <form
//       action={props.action}
//       method={props.method}
//       className={getClassName(props.className, props.auxClassName)}
//       onSubmit={props.onSubmit}
//     >
//       {props.children}
//     </form>
//   );
// };

function Form(props: TFormProps) {
  if (props.baseClassName) baseClass = props.baseClassName;
  return (
    <form
      action={props.action}
      method={props.method}
      className={getClassName(props.className, props.auxClassName)}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
}
type TForm = typeof Form & {
  Label: typeof FormLabel;
  Control: typeof FormControl;
  Select: typeof FormControlSelect;
  Group: typeof FormGroup;
};

Form.Label = FormLabel;
Form.Control = FormControl;
Form.Select = FormControlSelect;
Form.Group = FormGroup;

export default Form as TForm;
