import React, {
  memo, MouseEvent, useCallback, useContext, useEffect, useState,
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
  const [isActive, setIsActive] = useState<{[index: string]: boolean}>({ star: true, magnifier: false });
  const getPlaceholder = ():string => {
    if (isActive.star) {
      return t('Избранное');
    }
    return t('Поиск');
  };

  useClickOutside(resultsRef, (evt) => {
    if (isOpen && evt.target !== inputRef.current) setTimeout(() => setIsOpen(false), 50);
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
    if (!isMobile) {
      inputRef.current.focus();
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
      setIsOpen(value !== '');
    }

    setSearchValue(value);
  }, [dispatch, setIsOpen, isMobile]);

  const onClickFavorite = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsOpen(true);
    setIsActive(() => (
      {
        star: true,
        magnifier: false,
      }
    ));
  }, [setIsOpen]);

  const onClickSearch = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsActive(() => (
      {
        star: false,
        magnifier: true,
      }
    ));
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
          placeholder={getPlaceholder()}
          onChange={onChangeSearch}
          value={search}
          onFocus={onFocus}
        />
        <Button
          aria-label={t('Избранное')}
          className={classNames(cls.button, { [cls.active]: isActive.star && isMobile })}
          theme="icon"
          variant="star"
          onClick={onClickFavorite}
        />
        <Button
          aria-label={t('Поиск')}
          type="submit"
          theme="icon"
          variant="magnifier"
          className={classNames(cls.button, { [cls.active]: isActive.magnifier && isMobile })}
          onClick={onClickSearch}
        />
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
