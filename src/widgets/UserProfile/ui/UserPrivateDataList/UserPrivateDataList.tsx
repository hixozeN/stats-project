import {
  memo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserPrivateData } from 'entities/Lesta';
import {
  UserPrivateDataItem,
} from 'widgets/UserProfile/ui/UserPrivateDataItem/UserPrivateDataItem';
import { getUserData } from 'entities/User/model/selectors/getUserData/getUserData';
import { useParams } from 'react-router-dom';
import cls from './UserPrivateDataList.module.scss';

interface UserPrivateDataListProps {
  className?: string;
}

type KeyType = 'gold' | 'credits' | 'premium' | 'free_xp';

export const UserPrivateDataList = memo((props: UserPrivateDataListProps) => {
  const { className } = props;
  const { id } = useParams();
  const privateUserData = useSelector(getUserPrivateData);
  const currentUser = useSelector(getUserData);
  const isProfileOwner = currentUser?.lestaData?.account_id === Number(id);

  if (!privateUserData || !isProfileOwner) return null;

  return (
    <ul className={classNames(cls.privateData, {}, [className])}>
      {Object.entries(privateUserData).map(
        ([key, value]: [KeyType, number]) => <UserPrivateDataItem key={key} variant={key} value={value} />,
      )}
    </ul>
  );
});
