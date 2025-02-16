import React, {
  memo, MouseEvent, useCallback, useContext, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import useDebounce from 'shared/hooks/useDebounce';
import { searchActions } from '../../model/slice/searchSlice';
import { getSearchState } from '../../model/selectors/getSearchState/getSearchState';
import { searchUsersAndClans } from '../../model/services/searchUsersAndClans/searchUsersAndClans';
import { DeviceContext, SearchModalsContext } from '../Search/Search';
import { SearchInput } from '../SearchInput/SearchInput';
import cls from './SearchForm.module.scss';

interface IAuthFormProps {
  className?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

export const SearchForm = memo((props: IAuthFormProps) => {
  const {
    className,
    inputRef,
  } = props;
  const { t } = useTranslation('search');
  const dispatch = useDispatch();
  const { search } = useSelector(getSearchState);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const { isMobile } = useContext(DeviceContext);
  const {
    setIsPopoverOpen, setSearchType,
  } = useContext(SearchModalsContext);

  const onFocus = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length >= 1 && !isMobile) {
      setIsPopoverOpen(true);
    }
  };

  const onInputClick = () => {
    setSearchType('all');
    if (searchValue?.length >= 1 && !isMobile) {
      setIsPopoverOpen(true);
    }
  };

  const onClickClear = () => {
    setSearchValue('');
    dispatch(searchActions.setSearch(''));
    inputRef?.current.focus();
    if (!isMobile) {
      setIsPopoverOpen(false);
    }
  };

  const handleSubmit = useCallback(async (value: string) => {
    if (!isMobile) {
      inputRef?.current.focus();
    }
    if (debouncedSearch.length >= 2) {
      dispatch(searchUsersAndClans({ string: value, limit: 100 }));
    }
  }, [dispatch, debouncedSearch, isMobile, inputRef]);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      handleSubmit(debouncedSearch);
    }
  }, [debouncedSearch, handleSubmit]);

  const onChangeSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    dispatch(searchActions.setSearch(value));

    if (!isMobile) {
      setIsPopoverOpen(value !== '');
    }

    setSearchValue(value);
  }, [dispatch, setIsPopoverOpen, isMobile]);

  const onClickSearch = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSubmit(search);
  }, [handleSubmit, search]);

  return (
    <div className={classNames(cls.container, { [cls.opened]: isMobile })}>
      <form
        className={classNames(cls.SearchForm, {}, [className])}
        autoComplete="off"
        onSubmit={(evt) => { evt.preventDefault(); handleSubmit(search); }}
      >
        <SearchInput
          ref={inputRef}
          id="search"
          type="search"
          placeholder={t('Поиск')}
          onChange={onChangeSearch}
          value={search}
          onFocus={onFocus}
          onClick={onInputClick}
        />
        {!isMobile && (
        <Button
          aria-label={t('Поиск')}
          type="submit"
          theme="icon"
          variant="magnifier"
          className={classNames(cls.button)}
          onClick={onClickSearch}
        />
        )}
      </form>
      {search && !isMobile
        && (
        <Button
          className={cls.buttonClose}
          theme="clear"
          variant="close"
          onClick={onClickClear}
        />
        )}
    </div>
  );
});
