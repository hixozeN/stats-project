import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { statList } from 'entities/Tank/config/TankData';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { FilterItem } from './FilterItem';
import { filterData } from './config/filterData';
import cls from './Filter.module.scss';

interface TanksProps<T> {
  dataList?: T[];
}

function FilterWithCurtain<T>({ dataList }: TanksProps<T>) {
  const { t } = useTranslation('tank');
  const [isOpenFilter, setOpenFilter] = useState(false);
  const filterList = dataList;

  const closeFilter = () => {
    setOpenFilter(false);
  };

  const applyFilter = () => {
    closeFilter();
  };

  const clearFilter = () => {};

  const openFilter = () => {
    setOpenFilter(true);
  };

  return (
    <div className={cls.tanks}>
      <h2 className={cls.title}>{`${t('Техника')} (${filterList.length})`}</h2>
      <ul className={cls.sortList}>
        {statList.map((item) => (
          <li className={cls.sortItem} key={item}>
            <Button theme="icon-right" variant="chevron-down">
              {t(`${item}`)}
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={openFilter}>{t('Настроить фильтр')}</Button>
      <div className={classNames(cls.wrapper, { [cls.open]: isOpenFilter })}>
        <form className={cls.filterForm}>
          {filterData.map((data) => (
            <fieldset className={cls.group} key={data.name}>
              <legend className={cls.legend}>{t(`${data.text}`)}</legend>
              <ul className={cls.filterList}>
                {data.value.map((item) => (
                  <FilterItem
                    item={item}
                    param={data.param}
                    name={data.name}
                    key={`${data.param}-${item}`}
                  />
                ))}
              </ul>
            </fieldset>
          ))}
          <ul className={cls.buttonList}>
            <li className={cls.buttonItem}>
              <Button onClick={clearFilter} theme="clear">
                {t('Сбросить')}
              </Button>
            </li>
            <li className={cls.buttonItem}>
              <Button onClick={applyFilter}>{t('Фильтр')}</Button>
            </li>
            <li className={cls.buttonItem}>
              <Button theme="clear" variant="close" onClick={closeFilter} />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export const Filter = memo(FilterWithCurtain);
