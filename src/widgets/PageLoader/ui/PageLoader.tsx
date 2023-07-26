import { classNames } from 'shared/lib/classNames/classNames';
import Loader from 'shared/ui/Loader/Loader';
import cls from './PageLoader.module.scss';

interface IPageLoaderProps {
  className?: string;
}

export function PageLoader({ className }: IPageLoaderProps) {
  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
}
