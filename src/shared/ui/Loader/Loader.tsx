import cls from './Loader.module.scss';

const Loader = () => (
  <div className={cls.wrapper}>
    <div className={cls['lds-ellipsis']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
