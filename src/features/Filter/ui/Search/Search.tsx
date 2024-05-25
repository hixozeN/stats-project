import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/ui/Input';
import React, {
  ChangeEvent,
  FormEvent, useCallback, useRef,
} from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
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
  const search = useSelector(getSearchFilter);
  const dispatch = useAppDispatch();
  const searchValue = useSelector(getSearchFilter);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(filterActions.clearSearch());
    inputRef.current.focus();
  };

  const submitForm = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(filterActions.setSearchValue(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className={classNames(cls.SearchTanks, {}, [className])}>
      <form id={SearchData.nameForm} onSubmit={submitForm}>
        <Input
          className={classNames(cls.inputSearch, { [cls.input]: search !== '' })}
          data={SearchData}
          ref={inputRef}
          onChange={onChange}
          value={searchValue}
          placeholder={t(`${SearchData.placeholder}`)}
        />
        {search
          && (
          <Button
            className={cls.buttonClose}
            theme="clear"
            variant="close"
            onClick={onClickClear}
          />
          )}
      </form>
    </div>
  );
};
