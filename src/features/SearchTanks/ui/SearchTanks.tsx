import { classNames } from 'shared/lib/classNames/classNames';
import { FormData, Input } from 'shared/ui/Input/ui/Input';
import React, {
  ChangeEvent, useCallback, useRef, useState,
} from 'react';
import { TUserTanks } from 'entities/Lesta';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { filterActions } from 'features/Filter';
import cls from './SearchTanks.module.scss';

interface SearchTanksProps {
  className?: string,
  dataList?: TUserTanks[]
}

export const TankSearch = (props: SearchTanksProps) => {
  const { className, dataList } = props;

  const data: FormData = {
    type: 'search',
    name: 'tanks',
    nameForm: 'searchTanks',
    placeholder: 'Поиск',
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [valueInput, setValueInput] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();

  const filterSearh = (value: string, tanksList: TUserTanks[]) => tanksList.filter(
    (tank:TUserTanks) => tank.tankData.name.trim().toLowerCase().includes(value.trim().toLowerCase()),
  );

  const onChangeSearch = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const {
      value,
      name,
    } = evt.target;

    setValueInput((valueTarget) => ({
      ...valueTarget,
      [name]: value,
    }));
    dispatch(filterActions.setFilterData(filterSearh(value, dataList)));
  }, [dispatch, dataList]);

  return (
    <div className={classNames(cls.SearchTanks, {}, [className])}>
      <form id={data.nameForm}>
        <Input
          className={cls.inputSearch}
          data={data}
          ref={inputRef}
          onChange={onChangeSearch}
          value={valueInput[data.name] ?? ''}
        />
      </form>
    </div>
  );
};
