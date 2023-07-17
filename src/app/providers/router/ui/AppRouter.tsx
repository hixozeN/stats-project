import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
