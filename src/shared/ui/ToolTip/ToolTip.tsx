import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ToolTip.module.scss';

interface ToolTipProps<T> {
  className?: string;
  text: T;
  isVisible: boolean;
}

function ToolTip<T>({ className, text, isVisible }: ToolTipProps<T>) {
  return (
    <span className={classNames(cls.tooltip, { [cls.visible]: isVisible }, [className])}>
      <span className={classNames(cls.cloud)}>{text}</span>
    </span>
  );
}

export { ToolTip };
