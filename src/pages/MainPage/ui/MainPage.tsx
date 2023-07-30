import React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { TestErrorBoundary } from 'features/TestErrorBoundary/ui/TestErrorBoundary';

function MainPage() {
  const { t } = useTranslation('main');

  return (
    <div>
      <h1>
        {t('Главная страница')}
        <ErrorBoundary>
          <TestErrorBoundary />
        </ErrorBoundary>
      </h1>
    </div>
  );
}

export default MainPage;
