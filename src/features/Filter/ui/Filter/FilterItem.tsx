import React, {
  ForwardedRef,
  InputHTMLAttributes,
  LegacyRef,
  ReactElement,
  forwardRef,
  useMemo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  masteryTank, nationFlag, typeIcon, getLevelRoman,
} from 'entities/Tank';
import cls from './Filter.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange'
>;

interface IFilterInputProps extends HTMLInputProps {
  className?: string;
  checked?: boolean;
  onChange?: (checked: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: LegacyRef<HTMLInputElement>;
  value: string;
  param: string;
  nameParam: 'tier' | 'type' | 'nation' | 'mark_of_mastery';
}

export const FilterItem = forwardRef((props: IFilterInputProps, ref:ForwardedRef<HTMLInputElement>) => {
  const { t } = useTranslation('filter');

  const {
    className, checked, onChange, value, param, nameParam, ...otherProps
  } = props;

  const mastery: Record<number, ReactElement> = useMemo(() => masteryTank, []);
  const typeTank: Record<string, ReactElement> = useMemo(() => typeIcon, []);
  const nationTank: Record<string, ReactElement> = useMemo(
    () => nationFlag,
    [],
  );

  const renderContent = useCallback(() => {
    if (nameParam === 'tier') {
      return <span className={cls.text}>{getLevelRoman(Number(value))}</span>;
    }
    if (nameParam === 'type') {
      return (
        <>
          {typeTank[value]}
          <span>{t(`${value}`)}</span>
        </>
      );
    }
    if (nameParam === 'nation') {
      return (
        <>
          {nationTank[value]}
          <span>{t(`${value}`)}</span>
        </>
      );
    }
    if (nameParam === 'mark_of_mastery') {
      return (
        <img
          className={cls.mastery}
          src={`${mastery[Number(value)]}`}
          alt={t(`${value}`)}
          loading="lazy"
        />
      );
    }
    return null;
  }, [mastery, typeTank, nameParam, nationTank, t, value]);

  return (
    <li className={cls.filterItem}>
      <input
        className={classNames(cls.checkbox, {}, [cls.visuallyHidden, className])}
        type="checkbox"
        name={`${value}`}
        id={`${param}-${value}`}
        ref={ref}
        checked={checked}
        onChange={onChange}
        {...otherProps}
      />
      <label
        className={classNames(cls.label, {}, [cls[nameParam]])}
        htmlFor={`${param}-${value}`}
      >
        {renderContent()}
      </label>
    </li>
  );
});
