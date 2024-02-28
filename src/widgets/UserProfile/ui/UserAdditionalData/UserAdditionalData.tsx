import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  UserAdditionalDataSection,
} from 'widgets/UserProfile/ui/UserAdditionalDataSection/UserAdditionalDataSection';
import cls from './UserAdditionalData.module.scss';

interface UserAdditionalDataProps {
  className?: string;
}

export const UserAdditionalData = memo((props: UserAdditionalDataProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.UserAdditionalData, {}, [className])}>
      <UserAdditionalDataSection title="Данные игрока" />
    </div>
  );
});
