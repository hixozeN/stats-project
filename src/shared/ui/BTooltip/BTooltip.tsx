import { ReactNode } from 'react';
import { Tooltip } from 'antd';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BTooltip.module.scss';

type UnderlineColor = 'primary' | 'accent' | 'green' | 'red';
type UnderlineStyle = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
type UnderlinePosition = 'none' | 'underline' | 'overline' | 'lineThrough';
type TextColor = 'primaryColor' | 'accentColor' | 'greenColor' | 'redColor';

interface BTooltipProps {
  className?: string;
  title: ReactNode;
  children: ReactNode;
  underlineColor?: UnderlineColor;
  underlineStyle?: UnderlineStyle;
  underlinePosition?: UnderlinePosition;
  textColor?: TextColor;
}

export const BTooltip = (props: BTooltipProps) => {
  const {
    className,
    title,
    children,
    underlineColor = 'primary',
    underlineStyle = 'solid',
    underlinePosition = 'underline',
    textColor = 'primaryColor',
  } = props;

  return (
    <div className={
      classNames(
        cls.wrapper,
        {},
        [
          cls[underlineColor],
          cls[underlineStyle],
          cls[underlinePosition],
          cls[textColor],
          className,
        ],
      )
    }
    >
      <Tooltip
        title={title}
        trigger={['hover', 'click']}
        destroyTooltipOnHide
        fresh
        rootClassName={cls.tooltip}
      >
        {children}
      </Tooltip>
    </div>
  );
};
