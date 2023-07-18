import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';

function AppRouter() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div>{t('Загрузка')}</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route
            path={path}
            element={(
              <div className="page-wrapper">
                {element}
              </div>
)}
            key={path}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
