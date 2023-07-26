import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
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
