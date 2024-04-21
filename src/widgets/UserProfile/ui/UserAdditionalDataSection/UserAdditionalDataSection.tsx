import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  UserAdditionalDataItem,
} from 'widgets/UserProfile/ui/UserAdditionalDataItem/UserAdditionalDataItem';
import cls from './UserAdditionalDataSection.module.scss';

interface UserAdditionalDataSectionProps {
  title: string;
  className?: string;
}

export const UserAdditionalDataSection = memo((props: UserAdditionalDataSectionProps) => {
  const { className, title } = props;

  return (
    <div className={classNames(cls.section, {}, [className])}>
      <h3 className={cls.sectionHeading}>
        {title}
      </h3>
      <ul className={cls.itemList}>
        <UserAdditionalDataItem label="ID" value="82166719" />
        <UserAdditionalDataItem label="Зарегистрирован" value="27.02.24" />
        <UserAdditionalDataItem label="В игре с" value="27.02.24" />
      </ul>
    </div>
  );
});
