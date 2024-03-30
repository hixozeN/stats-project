import React, {
  ForwardedRef,
  InputHTMLAttributes,
  LegacyRef,
  ReactElement,
  forwardRef,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  masteryTank,
  nationFlag,
  typeIcon,
} from 'entities/Tank/config/TankData';
import { getLevelRoman } from 'entities/Tank/lib/converterTank';
import cls from './Filter.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange'
>;

interface IAuthInputProps extends HTMLInputProps {
  className?: string;
  checked?: boolean;
  onChange?: (checked: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: LegacyRef<HTMLInputElement>;
  value: string;
  param: string;
  name: string;
}

export const FilterItem = forwardRef((props: IAuthInputProps, ref:ForwardedRef<HTMLInputElement>) => {
  const { t } = useTranslation('filter');

  const {
    className, checked, onChange, value, param, name, ...otherProps
  } = props;

  const mastery: Record<number, ReactElement> = useMemo(() => masteryTank, []);
  const typeTank: Record<string, ReactElement> = useMemo(() => typeIcon, []);
  const nationTank: Record<string, ReactElement> = useMemo(
    () => nationFlag,
    [],
  );

  const renderContent = () => {
    if (param === 'tankData.tier') {
      return <span className={cls.text}>{getLevelRoman(Number(value))}</span>;
    }
    if (param === 'tankData.type') {
      return (
        <>
          {typeTank[value]}
          <span>{t(`${value}`)}</span>
        </>
      );
    }
    if (param === 'tankData.nation') {
      return (
        <>
          {nationTank[value]}
          <span>{t(`${value}`)}</span>
        </>
      );
    }
    if (param === 'statistics.mark_of_mastery') {
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
  };

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
        className={classNames(cls.label, {}, [cls[name]])}
        htmlFor={`${param}-${value}`}
      >
        {renderContent()}
      </label>
    </li>
  );
});
