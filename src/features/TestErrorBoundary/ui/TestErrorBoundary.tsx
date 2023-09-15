import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './TestErrorBoundary.module.scss';

interface ITestErrorBoundaryProps {
  className?: string;
}

// Тестовый компонент с кнопкой проброса неожиданной ошибки
export function TestErrorBoundary({ className }: ITestErrorBoundaryProps) {
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={classNames(cls.TestErrorBoundary, {}, [className])}>
      <Button
        className="font-m"
        theme={ButtonTheme.BORDER}
        onClick={handleError}
      >
        {t('Прокинуть ошибку')}
      </Button>
    </div>
  );
}
