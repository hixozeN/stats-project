import { classNames } from 'shared/lib/classNames/classNames';
import cls from 'src/shared/ui/Tooltip/Tooltip.module.scss';

type ThemeTooltip = 'tanks' | 'favorites';

interface ToolTipProps {
  className?: string;
  text: string;
  isVisible: boolean;
  theme?: ThemeTooltip;
}

export const Tooltip = ({
  className, text, isVisible, theme,
}: ToolTipProps) => (
  <span className={classNames(cls.tooltip, { [cls.visible]: isVisible }, [className])}>
    <span className={classNames(cls.cloud, {}, [cls[theme]])}>{text}</span>
  </span>
);
