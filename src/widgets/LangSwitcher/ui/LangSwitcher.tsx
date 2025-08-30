import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Dropdown, type MenuProps } from 'antd';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  visible: boolean;
  className?: string;
}

export const LangSwitcher = memo(({ className, visible }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const languages: MenuProps['items'] = useMemo(() => (
    [
      {
        label: 'Ру',
        key: 'ru',
      },
      {
        label: 'EN',
        key: 'en',
      },
      {
        label: '中国人',
        key: 'cn',
      },
    ]
  ), []);

  const changeTranslation = async (lang: string) => {
    await i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <Dropdown
      className={classNames(cls.LangSwitcher, { [cls.visible]: visible }, [className])}
      menu={{
        items: languages,
        selectable: true,
        defaultSelectedKeys: [i18n.language],
        onClick: async (item) => {
          await changeTranslation(item.key);
        },
      }}
      trigger={['click']}
    >
      <Button theme="clear">
        {t('ЯзыкСокращенно')}
      </Button>
    </Dropdown>
  );
});
