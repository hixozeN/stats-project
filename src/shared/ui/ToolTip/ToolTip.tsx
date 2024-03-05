import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ToolTip.module.scss';

interface ToolTipProps<T> {
  text: T;
  isVisible: boolean;
}

function ToolTip<T>({ text, isVisible }: ToolTipProps<T>) {
  return (
    <span className={classNames(cls.tooltip, { [cls.visible]: isVisible }, [])}>
      <span className={classNames(cls.cloud)}>{text}</span>
      {/* <span className={classNames(cls.text)}>{text}</span> */}
    </span>
  );
}

export { ToolTip };
