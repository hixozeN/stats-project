import { classNames } from 'shared/lib/classNames/classNames';

import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes, LegacyRef, useState,
} from 'react';
import { Button } from 'shared/ui/Button/Button';
import cls from './SearchInput.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface IAuthInputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: LegacyRef<HTMLInputElement>;
}

export const SearchInput = forwardRef(
  (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [isOpenSearch, setOpenSearch] = useState(false);
    const clickSearch = () => {
      if (window.innerWidth <= 768) {
        setOpenSearch(!isOpenSearch);
      }
    };

    const {
      className, value, onChange, ...otherProps
    } = props;

    return (
      <div className={cls.searchWrapper}>
        <label htmlFor="search" className={cls.inputWrapper}>
          <input
            id="search"
            type="search"
            ref={ref}
            className={classNames(cls.SearchInput, { [cls.open]: isOpenSearch }, [className])}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        </label>
        <Button
          type="submit"
          theme="icon"
          variant="magnifier"
          className={cls.button}
          onClick={clickSearch}
        />
      </div>
    );
  },
);
