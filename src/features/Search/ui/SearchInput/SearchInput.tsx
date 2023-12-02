import { classNames } from 'shared/lib/classNames/classNames';
import Magnifier from 'shared/assets/icons/magnifier.svg';
import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes, LegacyRef,
} from 'react';
import cls from './SearchInput.module.scss';

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

export const SearchInput = forwardRef(
  (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className, value, onChange, ...otherProps
    } = props;

    return (
      <label htmlFor="search" className={cls.inputWrapper}>
        <Magnifier
          className={classNames(cls.btnMagnifier)}
          onClick={() => {}}
        />
        <input
          id="search"
          type="search"
          ref={ref}
          className={classNames(cls.SearchInput, {}, [className])}
          value={value}
          onChange={onChange}
          {...otherProps}
        />
      </label>
    );
  },
);
