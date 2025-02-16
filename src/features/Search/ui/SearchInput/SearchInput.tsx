import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes, LegacyRef, useContext,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SearchInput.module.scss';
import { DeviceContext, SearchModalsContext } from '../Search/Search';

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

    const { isOpenPopup, searchType } = useContext(SearchModalsContext);
    const { isMobile } = useContext(DeviceContext);

    if (searchType === 'favorites' && isMobile) return null;

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
