import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'antd';
import { WidgetTile } from '../WidgetTile/WidgetTile';
import { WidgetStrip } from '../WidgetStrip/WidgetStrip';
import { WidgetTheme } from '../../model/types/SessionWidgetSchema';
import cls from './SessionWidgetPreview.module.scss';

interface SessionWidgetPreviewProps {
  theme: WidgetTheme;
}

export const SessionWidgetPreview = memo((props: SessionWidgetPreviewProps) => {
  const { theme } = props;
  const { t } = useTranslation('widgets');

  const previewContainer: Record<WidgetTheme, ReactNode> = {
    [WidgetTheme.TILE_ROW]: <WidgetTile />,
    [WidgetTheme.TILE_COLUMN]: <WidgetTile />,
    [WidgetTheme.ROW]: <WidgetStrip isPreview />,
    [WidgetTheme.COLUMN]: <WidgetStrip isPreview />,
  };

  return (
    <Collapse
      className={cls.collapse}
      items={[
        { key: '1', label: <>{t('COLLAPSE_PREVIEW_TITLE')}</>, children: previewContainer[theme] },
      ]}
    />
  );
});
