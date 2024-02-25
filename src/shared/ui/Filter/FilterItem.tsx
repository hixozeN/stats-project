import { ReactElement, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { masteryTank, nationFlag, type } from 'entities/Tank/config/TankData';
import { getLevelRoman } from 'entities/Tank/lib/converterTank';
import cls from './Filter.module.scss';

interface TanksProps {
  item: string;
  param: string;
  name: string;
}

export const FilteerItem = memo(({
  item, param, name,
}: TanksProps) => {
  const { t } = useTranslation('filter');

  const mastery: Record<number, ReactElement> = useMemo(() => masteryTank, []);
  const typeTank: Record<string, ReactElement> = useMemo(() => type, []);
  const nationTank: Record<string, ReactElement> = useMemo(
    () => nationFlag,
    [],
  );

  const renderContent = () => {
    if (param === 'tankData.tier') {
      return <span className={cls.text}>{getLevelRoman(Number(item))}</span>;
    }
    if (param === 'tankData.type') {
      return (
        <>
          {typeTank[item]}
          <span>{t(`${item}`)}</span>
        </>
      );
    }
    if (param === 'tankData.nation') {
      return (
        <>
          {nationTank[item]}
          <span>{t(`${item}`)}</span>
        </>
      );
    }
    if (param === 'mark_of_mastery') {
      return (
        <img
          className={cls.mastery}
          src={`${mastery[Number(item)]}`}
          alt={t(`${item}`)}
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
        name={`${item}`}
        id={`${param}-${item}`}
      />
      <label
        className={classNames(cls.label, {}, [cls[name]])}
        htmlFor={`${param}-${item}`}
      >
        {renderContent()}
      </label>
    </li>
  );
});
