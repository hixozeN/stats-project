import {
  ReactNode,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { className, children } = props;

  return (
    <div
      className={classNames(
        cls.pageWrapper,
        {},
        [className],
      )}
    >
      {children}
    </div>
  );
};
