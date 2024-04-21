import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes, LegacyRef, useContext,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { MobileContext } from '../SearchMobile/SearchMobile';
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
}

export const SearchInput = forwardRef(
  (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      value,
      onChange,
      ...otherProps
    } = props;

    const { isOpenPopup } = useContext(MobileContext);

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
            spellCheck={false}
            {...otherProps}
            maxLength={24}
          />
        </label>
      </div>
    );
  },
);
