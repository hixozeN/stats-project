import { classNames } from 'shared/lib/classNames/classNames';
import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes, LegacyRef,
} from 'react';
import cls from './AuthInput.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
  >;

interface IAuthInputProps extends HTMLInputProps{
  className?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: LegacyRef<HTMLInputElement>;
}

export const AuthInput = forwardRef(
  (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className, value, onChange, ...otherProps
    } = props;

    return (
      <input
        ref={ref}
        className={classNames(cls.AuthInput, {}, [className])}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    );
  },
);
