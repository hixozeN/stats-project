import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './RatingItem.module.scss';

interface RatingItemSkeletonProps {
  className?: string;
  isCurrentUserItem?: boolean;
}

export const RatingItemSkeleton = memo((props: RatingItemSkeletonProps) => {
  const { className, isCurrentUserItem } = props;

  return (
    <Skeleton
      className={classNames(cls.RatingItem, { [cls.currentUser]: isCurrentUserItem }, [className])}
      height={75}
      borderRadius="5px"
    />
  );
});
