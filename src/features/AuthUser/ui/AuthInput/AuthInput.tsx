import { classNames } from 'shared/lib/classNames/classNames';
import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
} from 'react';
import cls from './AuthInput.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface IAuthInputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  // onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  error?: string;
  ref?: LegacyRef<HTMLInputElement>;
}

export const AuthInput = forwardRef(
  (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className, value, isError = false, error, ...otherProps
    } = props;

    return (
      <label htmlFor={otherProps.name} className={cls.label}>
        <input
          id={otherProps.name}
          ref={ref}
          className={classNames(cls.AuthInput, { [cls.error]: isError }, [
            className,
          ])}
          value={value}
          autoComplete={otherProps.autoComplete ?? otherProps.name}
          {...otherProps}
        />
        <span className={cls.errorMessage}>{error}</span>
      </label>
    );
  },
);
