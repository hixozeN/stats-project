import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/ui/Input';
import {
  ChangeEvent,
  FormEvent, useCallback, useRef,
} from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getSearchFilter } from '../../model/selectors';
import { SearchData } from '../../config/searchData';
import { filterActions } from '../../model/slice/filterSlice';
import cls from './Search.module.scss';

interface SearchTanksProps {
  className?: string,
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const Search = (props: SearchTanksProps) => {
  const {
    className,
    onChange,
  } = props;

  const { t } = useTranslation('filter');
  const dispatch = useAppDispatch();
  const searchValue = useSelector(getSearchFilter);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitForm = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(filterActions.setSearchValue(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className={classNames(cls.SearchTanks, {}, [className])}>
      <form id={SearchData.nameForm} onSubmit={submitForm}>
        <Input
          className={cls.inputSearch}
          data={SearchData}
          ref={inputRef}
          onChange={onChange}
          value={searchValue}
          placeholder={t(`${SearchData.placeholder}`)}
        />
      </form>
    </div>
  );
};
