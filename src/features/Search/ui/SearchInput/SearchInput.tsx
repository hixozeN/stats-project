import { classNames } from 'shared/lib/classNames/classNames';

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

interface IAuthInputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: LegacyRef<HTMLInputElement>;
  isOpenPopup?: boolean;
}

export const SearchInput = forwardRef(
  (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      value,
      onChange,
      isOpenPopup,
      ...otherProps
    } = props;

    return (
      <div className={cls.searchWrapper}>
        <label htmlFor="search" className={cls.inputWrapper}>
          <input
            id="search"
            type="search"
            ref={ref}
            className={classNames(cls.SearchInput, { [cls.visible]: isOpenPopup }, [className])}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        </label>
      </div>
    );
  },
);
