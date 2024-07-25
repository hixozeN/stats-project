import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './PageError.module.scss';

interface IPageErrorProps {
  className?: string;
  errorMessage?: string;
}

export function PageError({ className, errorMessage }: IPageErrorProps) {
  const { t } = useTranslation();
  const handleUpdatePage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls['page-error'], {}, [className])}>
      <h2 className={cls['page-error__title']}>
        {
          errorMessage
            ? t('CAUGHT_ERROR_MESSAGE', { error: errorMessage })
            : t('Произошла непредвиденная ошибка...')
        }
      </h2>
      <Button
        onClick={handleUpdatePage}
      >
        {t('Обновить страницу')}
      </Button>
    </div>
  );
}
