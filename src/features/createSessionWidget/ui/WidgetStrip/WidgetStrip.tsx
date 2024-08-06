import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TUserSession } from 'entities/Lesta/index';
import { useSessionWidget } from '../../lib/hooks/useSessionWidget';
import { WidgetElements, WidgetParams, WidgetTheme } from '../../model/types/SessionWidgetSchema';
import cls from './WidgetStrip.module.scss';

interface WidgetStripProps {
  className?: string;
  isPreview?: boolean;
  data?: TUserSession;
}

export const WidgetStrip = memo((props: WidgetStripProps) => {
  const { className, isPreview, data } = props;
  const {
    elementTitles, elementPreviewValues,
    paramsData,
  } = useSessionWidget({ data });

  const themeMods = {
    [cls.row]: paramsData[WidgetParams.THEME] === WidgetTheme.ROW,
    [cls.column]: paramsData[WidgetParams.THEME] === WidgetTheme.COLUMN,
  };

  const widgetElements = paramsData[WidgetParams.ELEMENTS]
    .split(',')
    .map((el: WidgetElements) => ({
      label: elementTitles[el],
      value: elementPreviewValues[el],
    }));

  return (
    <div
      className={classNames(cls.WidgetStrip, themeMods, [className])}
      style={{
        backgroundColor: paramsData[WidgetParams.BG],
      }}
    >
      {
        widgetElements
          .map(
            ({ label, value }) => (
              <p
                key={label}
                className={classNames(
                  cls.textElem,
                  { [cls.previewRow]: paramsData[WidgetParams.THEME] === WidgetTheme.ROW && isPreview },
                  [],
                )}
              >
                <span style={{ color: paramsData[WidgetParams.TITLE_COLOR] }}>{label}</span>
                {' '}
                <span className={cls.value} style={{ color: paramsData[WidgetParams.FONT_COLOR] }}>{value}</span>
              </p>
            ),
          )
      }
    </div>
  );
});
