import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
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
      <h1 className={classNames(cls.title)}>{t('Страница не найдена')}</h1>
      <div>
        <span>
          {t('Вернуться ')}
          <Link
            className="link-hovered highlight-color "
            to={RoutePath.main}
          >
            {t('на главную')}
          </Link>
          {t(' или ')}
          <Button
            // theme={ButtonTheme.HIGHLIGHT}
            onClick={() => navigate(-1)}
          >
            {t('назад?')}
          </Button>
        </span>
      </div>
    </div>
  );
}
