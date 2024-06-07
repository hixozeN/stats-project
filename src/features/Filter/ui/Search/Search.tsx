import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/ui/Input';
import React, {
  ChangeEvent, FocusEvent,
  FormEvent, useCallback, useRef, useState,
} from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { getSearchFilter } from '../../model/selectors';
import { searchData } from '../../config/searchData';
import { filterActions } from '../../model/slice/filterSlice';
import cls from './Search.module.scss';

interface SearchTanksProps {
  className?: string,
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void,
}

export const Search = (props: SearchTanksProps) => {
  const {
    className,
    onChange,
  } = props;

  const { t } = useTranslation('filter');
  const search = useSelector(getSearchFilter);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClickClear = () => {
    dispatch(filterActions.clearSearch());
    dispatch(filterActions.clearFilter());
    inputRef.current.focus();
  };

  const onClickFocus = () => {
    setIsOpen(true);
  };

  const onClickBlur = (evt: FocusEvent) => {
    const relatedTarget = evt.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.tagName && relatedTarget.tagName === 'BUTTON') {
      onClickClear();
    } else {
      setIsOpen(false);
    }
  };

  const submitForm = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(filterActions.setSearchValue(search));
  }, [dispatch, search]);

  return (
    <div className={classNames(cls.SearchTanks, {}, [className])}>
      <form id={searchData.nameForm} autoComplete="off" onSubmit={submitForm}>
        <Input
          className={classNames(cls.inputSearch, { [cls.input]: search !== '' || isOpen })}
          data={searchData}
          ref={inputRef}
          onChange={onChange}
          value={search}
          placeholder={t(`${searchData.placeholder}`)}
          autoComplete="off"
          onFocus={onClickFocus}
          onBlur={(evt) => onClickBlur(evt)}
        />
        {search
          && (
            <Button
              className={cls.buttonClose}
              theme="clear"
              variant="close"
              onClick={(evt) => { evt.stopPropagation(); onClickClear(); }}
            />
          )}
      </form>
    </div>
  );
};
