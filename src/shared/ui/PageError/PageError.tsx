import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './PageError.module.scss';

interface IPageErrorProps {
  className?: string;
}

export function PageError({ className }: IPageErrorProps) {
  const { t } = useTranslation();
  const handleUpdatePage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls['page-error'], {}, [className])}>
      <h2 className={cls['page-error__title']}>{t('Произошла непредвиденная ошибка...')}</h2>
      <Button
        className="font-m"
        theme={ThemeButton.BORDER}
        onClick={handleUpdatePage}
      >
        {t('Обновить страницу')}
      </Button>
    </div>
  );
}
