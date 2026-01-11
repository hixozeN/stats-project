import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import { UserPrimaryData } from './ui/UserPrimaryData';

interface MobileProfileProps {
  className?: string;
}

export const MobileProfile = memo((props: MobileProfileProps) => {
  const { className } = props;

  return (
    <section className={classNames('', {}, [className])}>
      <UserPrimaryData />
    </section>
  );
});
