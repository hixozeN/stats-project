import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface ILoader {
  className?: string
}
const Loader = ({ className }: ILoader) => (
  <div className={classNames(cls.wrapper, {}, [className])}>
    <div className={cls['lds-ellipsis']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
