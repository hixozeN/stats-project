import { Outlet } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider/index';

function ReduxLayout() {
  return (
    <StoreProvider>
      <Outlet />
    </StoreProvider>
  );
}

export default ReduxLayout;
