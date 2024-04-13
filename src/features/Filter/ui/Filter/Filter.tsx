import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchForm } from 'features/Search';
import { useSelector } from 'react-redux';
import { useFilterTanks } from 'shared/hooks/useFilterTanks/useFilterTanks';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import {
  getCheckboxesFilterState,
} from 'features/Filter/model/selectors/getCheckboxesFilterState/getCheckboxesFilterState';
import {
  IStatList,
  statList,
} from 'features/Filter/config/sortData';
import { useSorting } from 'shared/hooks/useSorting/useSorting';
import { Button } from '../../../../shared/ui/Button/Button';
import { FilterItem } from './FilterItem';
import { getFilterItem } from '../../config/filterData';
import { Sort } from '../Sort/Sort';
import cls from './Filter.module.scss';

interface FilterProps {
  dataList?: TUserTanks[];
  tab?: number;
}

function FilterWithCurtain({ dataList, tab }: FilterProps) {
  const { t } = useTranslation('filter');
  const checkboxes = useSelector(getCheckboxesFilterState);
  const {
    isOpenFilter, filter, openFilter, handlwApplyFilter, closeFilter, handleClearFilter, onChangeFilter,
  } = useFilterTanks(dataList);
  const { clickSort, handleChangeMenu, isSortOpen } = useSorting(filter);

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        aria-label={t('Закрыть')}
        className={classNames(cls.overlay, {
          [cls.overlayActive]: isSortOpen || isOpenFilter,
        })}
        onClick={isSortOpen ? handleChangeMenu : closeFilter}
      />
      <div className={cls.filterPanel}>
        <SearchForm />
        <div className={cls.sortWrapper}>
          <ul
            className={classNames(cls.sortList, { [cls.openSort]: isSortOpen })}
          >
            {statList.map((item: IStatList) => (
              <Sort data={item} key={item.nameItem} clickSort={clickSort} />
            ))}
          </ul>
          <Button
            className={cls.buttonSort}
            onClick={handleChangeMenu}
            theme="icon-right"
            variant="sort"
          >
            {t('sorting')}
          </Button>
        </div>
        <Button
          className={cls.buttonFilter}
          onClick={openFilter}
          theme="icon-right"
          variant="filter"
        >
          {t('to_filter')}
        </Button>
        <form
          className={classNames(cls.filterForm, { [cls.open]: isOpenFilter })}
        >
          {getFilterItem(tab).map((data) => (
            <fieldset className={cls.group} key={data.param} id={data.param}>
              <legend className={cls.legend}>{`${t(`${data.nameParam}`)}`}</legend>
              <ul className={cls.filterList}>
                {data.values.map((value) => (
                  <FilterItem
                    value={value}
                    param={data.param}
                    nameParam={data.nameParam}
                    key={`${data.param}-${value}`}
                    onChange={onChangeFilter}
                    checked={checkboxes[data.param][value]}
                  />
                ))}
              </ul>
            </fieldset>
          ))}
          <ul className={cls.buttonList}>
            <li className={cls.buttonItem}>
              <Button onClick={handleClearFilter} theme="clear">
                {t('throw_off')}
              </Button>
            </li>
            <li className={cls.buttonItem}>
              <Button onClick={handlwApplyFilter}>{t('filter')}</Button>
            </li>
            <li className={cls.buttonItem}>
              <Button theme="clear" variant="close" onClick={closeFilter} />
            </li>
          </ul>
        </form>
      </div>
    </>
  );
}

export const Filter = memo(FilterWithCurtain);
