import { routerConfiguration } from 'shared/config/routeConfig/routeConfig';
import { RouterProvider } from 'react-router-dom';
import Loader from 'shared/ui/Loader/Loader';

function App() {
  return (
    <RouterProvider fallbackElement={<Loader />} router={routerConfiguration} />
  );
}

export default App;
