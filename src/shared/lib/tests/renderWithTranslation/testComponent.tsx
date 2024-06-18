import { useTranslation } from 'react-i18next';

export function TestComponent() {
  const { t } = useTranslation();

  return <h1>{t('greeting')}</h1>;
}
