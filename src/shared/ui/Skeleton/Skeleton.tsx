import { CSSProperties, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className, borderRadius, height, width,
  } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={styles}
    />
  );
});
