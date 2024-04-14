import React, {
  memo, useCallback, useContext, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import useDebounce from 'shared/hooks/useDebounce';
import { searchActions } from '../../model/slice/searchSlice';
import { getSearchState } from '../../model/selectors/getSearchState/getSearchState';
import { searchUsersAndClans } from '../../model/services/searchUsersAndClans/searchUsersAndClans';
import { DeviceContext } from '../Search/Search';
import { DesktopContext } from '../SearchDesktop/SearchDesktop';
import { SearchInput } from '../SearchInput/SearchInput';
import cls from './SearchForm.module.scss';

interface IAuthFormProps {
  className?: string;
  resultsRef?: React.MutableRefObject<HTMLInputElement>;
}

export const SearchForm = memo((props: IAuthFormProps) => {
  const {
    className,
    resultsRef,
  } = props;
  const { t } = useTranslation('search');
  const dispatch = useDispatch();
  const { search } = useSelector(getSearchState);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const { isMobile } = useContext(DeviceContext);
  const { isOpen, setIsOpen } = useContext(DesktopContext);

  useClickOutside(resultsRef, () => {
    if (isOpen) setTimeout(() => setIsOpen(false), 50);
  }, isMobile);

  const onFocus = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length >= 1 && !isMobile) {
      setIsOpen(true);
    }
  };

  const onClickClear = () => {
    setSearchValue('');
    dispatch(searchActions.setSearch(''));
    inputRef.current.focus();
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const handleSubmit = useCallback(async (value: string) => {
    dispatch(searchUsersAndClans({ string: value, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      handleSubmit(debouncedSearch);
    }
  }, [debouncedSearch, handleSubmit]);

  const onChangeSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    dispatch(searchActions.setSearch(value));

    if (!isMobile) {
      setIsOpen(value !== '');
    }

    setSearchValue(value);
  }, [dispatch, setIsOpen, isMobile]);

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
        />
      </form>
      {search && !isMobile && <Button className={cls.button} theme="clear" variant="close" onClick={onClickClear} />}
    </div>
  );
});
