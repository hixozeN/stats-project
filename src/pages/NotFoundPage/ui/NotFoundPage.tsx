import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './NotFoundPage.module.scss';

interface INotFoundPageProps {
  className?: string;
}

export function NotFoundPage({ className }: INotFoundPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
      <div className={cls.wrapper}>
        <h1 className={classNames(cls.title)}>{t('Страница не найдена')}</h1>
        <p className={cls.caption}>
          {t('Описание 404')}
        </p>
        <div className={cls.message}>
          <Button
            onClick={() => navigate(RoutePath.main)}
            size="size_m"
            className={cls.button}
          >
            {t('на главную')}
          </Button>
          <Button
            theme="danger"
            size="size_m"
            onClick={() => navigate(-1)}
            className={cls.button}
          >
            {t('назад?')}
          </Button>
        </div>
      </div>
    </div>
  );
}
