import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { Auth } from 'features/AuthUser/ui/Auth/Auth';

function AuthorizationPage() {
  const { t } = useTranslation('auth');

  return (
    <ErrorBoundary>
      <SeoUpdater title={t('authPageTitle')} OGTitle={t('authPageTitle')} />
      <Auth />
    </ErrorBoundary>
  );
}

export default memo(AuthorizationPage);
