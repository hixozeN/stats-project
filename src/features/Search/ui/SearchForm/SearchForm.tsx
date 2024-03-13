import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsersAndClans } from 'features/Search/index';
import { searchActions } from '../../model/slice/searchSlice';
import { getSearchState } from '../../model/selectors/getSearchState/getSearchState';
import { SearchInput } from '../SearchInput/SearchInput';
import cls from './SearchForm.module.scss';

interface IAuthFormProps {
  className?: string;
}

export const SearchForm = memo((props: IAuthFormProps) => {
  const { className } = props;
  const { t } = useTranslation('search');
  const dispatch = useDispatch();
  const { search } = useSelector(getSearchState);

  const onChangeSearch = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(searchActions.setSearch(value));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchUsersAndClans({ string: search }));
  }, [search, dispatch]);

  return (
    <form
      className={classNames(cls.SearchForm, {}, [className])}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <SearchInput
        id="search"
        type="search"
        placeholder={t('Поиск')}
        onChange={onChangeSearch}
        value={search}
      />
    </form>
  );
});
