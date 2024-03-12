import { ReactElement, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { masteryTank, nationFlag, typeIcon } from 'entities/Tank/config/TankData';
import { getLevelRoman } from 'entities/Tank/lib/converterTank';
import cls from './Filter.module.scss';

export interface TanksProps{
  value: string;
  param: string;
  name: string;
}

export const FilterItem = memo(({
  value, param, name,
}: TanksProps) => {
  const { t } = useTranslation('filter');

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
    if (param === 'mark_of_mastery') {
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
        className={classNames(cls.checkbox, {}, [cls.visuallyHidden])}
        type="checkbox"
        name={`${value}`}
        id={`${param}-${value}`}
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
