import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  const handleError = () => {
    setError(true);
  };

  const showLoader = () => setLoading(!isLoading);

  return (
    <div className={classNames(cls.TestErrorBoundary, {}, [className])}>
      <Button>
        {t('Очень длинное слово в кнопке')}
      </Button>

      <Button
        theme="danger"
        onClick={handleError}
      >
        {t('Ой')}
      </Button>

      <Button
        theme="inverted"
        onClick={handleError}
      >
        {t('Среднее слово')}
      </Button>

      <Button
        theme="send-results"
        onClick={handleError}
      >
        {t('Слово')}
      </Button>

      <Button
        variant="edit"
        size="size_m"
        onClick={handleError}
        disabled
      >
        {t('Редактировать')}
      </Button>

      <Button
        variant="create"
        size="size_m"
        onClick={showLoader}
        isLoading={isLoading}
      >
        {t('Создать')}
      </Button>

      <Button
        variant="join"
        size="size_m"
        onClick={handleError}
      >
        {t('Подать заявку')}
      </Button>

      <Button
        variant="save"
        size="size_m"
        onClick={handleError}
      >
        {t('Сохранить')}
      </Button>

      <Button
        variant="block"
        theme="danger"
        size="size_m"
        onClick={handleError}
      >
        {t('Заблокировать')}
      </Button>

      <Button
        size="size_l"
        onClick={handleError}
      >
        {t('Смотреть игры')}
      </Button>

      <Button
        theme="send-results"
        size="size_l"
        onClick={handleError}
      >
        {t('Отправить результаты')}
      </Button>

      <Button
        variant="add-friend"
        size="size_m"
        onClick={handleError}
      >
        {t('Добавить в друзья')}
      </Button>

      <Button
        variant="invite-player"
        theme="team"
        size="size_l"
        onClick={handleError}
      >
        {t('Пригласить игрока')}
      </Button>

      <Button
        variant="kick-player"
        theme="team"
        size="size_l"
        onClick={handleError}
      >
        {t('Удалить участника')}
      </Button>

      <Button
        variant="leave-team"
        theme="team"
        size="size_l"
        onClick={showLoader}
        isLoading={isLoading}

      >
        {t('Покинуть команду')}
      </Button>

      <Button
        variant="disband"
        theme="danger"
        size="size_xxl"
        onClick={showLoader}
      >
        {t('Распустить состав')}
      </Button>

      <Button
        variant="edit-logo"
        theme="team"
        onClick={handleError}
      >
        {t('Изменить')}
      </Button>

      <Button
        variant="edit-logo"
        theme="team"
        onClick={showLoader}
      >
        {t('Изменить')}
      </Button>

      <Button
        onClick={showLoader}
        fontSize="font_xl"
      >
        {t('Изменить')}
      </Button>

      <Button
        onClick={showLoader}
        theme="icon"
        variant="notification"
      />

      <Button
        onClick={showLoader}
        theme="profile-icon"
        variant="send-message"
      />

      <Button
        onClick={showLoader}
        theme="profile-icon"
        variant="actions"
      />

    </div>
  );
}
