import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectProps } from 'antd';
import cls from './Select.module.scss';

interface AntSelectProps extends SelectProps{
  selectStyle?: string;
  popupStyle?: string;
}

export const AntSelect = memo((props: AntSelectProps) => {
  const {
    options, defaultValue, onChange, selectStyle, popupStyle, ...otherProps
  } = props;

  const selectStyles = classNames(cls.select, {}, [selectStyle]);
  const dropdownStyles = classNames(cls.dropdown, {}, [popupStyle]);

  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      className={selectStyles}
      popupClassName={dropdownStyles}
      onChange={onChange}
      {...otherProps}
    />
  );
});
