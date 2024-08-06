import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TUserSession } from 'entities/Lesta/index';
import { useSessionWidget } from '../../lib/hooks/useSessionWidget';
import {
  WidgetElements, WidgetParams,
  WidgetTheme,
} from '../../model/types/SessionWidgetSchema';
import cls from './WidgetTile.module.scss';

interface WidgetTileProps {
  data?: TUserSession;
}

export const WidgetTile = memo(({ data }: WidgetTileProps) => {
  const {
    paramsData,
    elementTitles,
    elementPreviewValues,
  } = useSessionWidget({ data });

  const themeMods = {
    [cls.row]: paramsData[WidgetParams.THEME] === WidgetTheme.TILE_ROW,
    [cls.column]: paramsData[WidgetParams.THEME] === WidgetTheme.TILE_COLUMN,
  };

  const elementsForRender: WidgetElements[] = paramsData[WidgetParams.ELEMENTS].split(',') as WidgetElements[];

  return (
    <div
      className={classNames(cls.widgetWrapper, themeMods, [])}
      style={{
        backgroundColor: paramsData[WidgetParams.BG],
      }}
    >
      {
        elementsForRender.map((el) => (
          <div
            key={el}
            className={cls.element}
            style={{
              backgroundColor: paramsData[WidgetParams.ELEMENT_BG],
              outline: `1px solid ${paramsData[WidgetParams.OUTLINE_COLOR]}`,
            }}
          >
            <span
              className={cls.elementHeading}
              style={{ color: paramsData[WidgetParams.TITLE_COLOR] }}
            >
              {elementTitles[el]}
            </span>
            <span
              className={cls.elementCounter}
              style={{ color: paramsData[WidgetParams.FONT_COLOR] }}
            >
              {elementPreviewValues[el]}
            </span>
          </div>
        ))
      }
    </div>
  );
});
