import { classNames } from 'shared/lib/classNames/classNames';
import React, {
  ForwardedRef, forwardRef, InputHTMLAttributes,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

export interface FormData {
  name: string;
  type: string;
  nameForm: string;
  maxLength?: number;
  minLength?: number;
  label?: string;
  placeholder?: string;
}

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  data: FormData;
}

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      value,
      onChange,
      data,
      children,
    } = props;

    const {
      name, nameForm, type, maxLength, placeholder,
    } = data;

    return (
      <label htmlFor={nameForm} className={cls.inputLabel}>
        <span>{children}</span>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={classNames(cls.Input, {}, [className])}
          value={value}
          onChange={onChange}
          spellCheck={false}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </label>
    );
  },
);
