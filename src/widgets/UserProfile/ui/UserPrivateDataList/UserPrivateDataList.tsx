import {
  memo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserDataLoadingStatus, getUserPrivateData } from 'entities/Lesta';
import {
  UserPrivateDataItem,
} from 'widgets/UserProfile/ui/UserPrivateDataItem/UserPrivateDataItem';
import { getUserData } from 'entities/User/model/selectors/getUserData/getUserData';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
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
  const isUserDataLoading = useSelector(getUserDataLoadingStatus);

  if (isUserDataLoading && isProfileOwner) {
    return (
      <ul className={classNames(cls.privateData, {}, [cls.skeleton])}>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {[...new Array(4)].map((_) => <Skeleton width={100} height={20} borderRadius="5px" />)}
      </ul>
    );
  }

  if (!privateUserData || !isProfileOwner) return null;

  return (
    <ul className={classNames(cls.privateData, {}, [className])}>
      {Object.entries(privateUserData).map(
        ([key, value]: [KeyType, number]) => <UserPrivateDataItem key={key} variant={key} value={value} />,
      )}
    </ul>
  );
});
