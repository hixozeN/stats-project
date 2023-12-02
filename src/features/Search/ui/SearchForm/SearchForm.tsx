import { classNames } from 'shared/lib/classNames/classNames';
import {
  FormEvent,
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import {
  getLoggedInStatus,
} from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { SearchInput } from 'features/Search/ui/SearchInput/SearchInput';
import { searchActions } from 'features/Search/model/slice/searchSlice';
import { getSearchState } from 'features/Search';
import cls from './SearchForm.module.scss';

interface IAuthFormProps {
  className?: string;
}

export const SearchForm = memo((props: IAuthFormProps) => {
  const { className } = props;
  const { t } = useTranslation('auth');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const {
    search,
  } = useSelector(getSearchState);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getLoggedInStatus);

  const onChangeSearch = useCallback((e) => {
    const { value } = e.target;
    dispatch(searchActions.setSearch(value));
  }, [dispatch]);

  // const togglePasswordVisible = useCallback(() => {
  //   if (inputPasswordRef.current.getAttribute('type') === 'password') {
  //     inputPasswordRef.current.setAttribute('type', 'text');
  //     setPasswordVisible(true);
  //   } else {
  //     inputPasswordRef.current.setAttribute('type', 'password');
  //     setPasswordVisible(false);
  //   }
  // }, []);

  // const changeTab = useCallback((tabName) => {
  //   if (tabName === 'auth') {
  //     setType({ isAuthActive: true, isRegActive: false });
  //   } else {
  //     setType({ isAuthActive: false, isRegActive: true });
  //   }
  // }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(RoutePath.main);
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <ErrorBoundary>
      <form className={classNames(cls.SearchForm, {}, [className])} onSubmit={handleSubmit}>

        <SearchInput
          id="search"
          type="search"
          placeholder={t('Поиск')}
          onChange={onChangeSearch}
          value={search}
        />

      </form>
    </ErrorBoundary>
  );
});
