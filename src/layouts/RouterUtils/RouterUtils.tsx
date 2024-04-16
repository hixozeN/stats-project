import React from 'react';
import {
  useNavigate as useNavigateOriginal,
  useLocation as useLocationOriginal,
  Outlet,
} from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RouterUtilsContext = React.createContext<any>(null);

/*
  With this RouterUtilsContext - we tank the updates from react-router context and
  drill down navigate and location from a separate context.
  This will prevent re-render of consumer components of these hooks for every route change
  and allow using these hooks as utilities instead of context subscribers
*/
const RouterUtils: React.FC = () => {
  const navigate = useNavigateOriginal();
  const location = useLocationOriginal();

  // useRef retains object reference between re-renders
  const navigateRef = React.useRef<ReturnType<typeof useNavigateOriginal>>(navigate);
  const locationRef = React.useRef<ReturnType<typeof useLocationOriginal>>(location);

  navigateRef.current = navigate;
  locationRef.current = location;

  // contextValue never changes between re-renders since refs don't change between re-renders
  const contextValue = React.useMemo(() => ({ navigateRef, locationRef }), [locationRef, navigateRef]);

  // since contextValue never changes between re-renders, components/hooks using this context
  // won't re-render when router context updates
  return <RouterUtilsContext.Provider value={contextValue}><Outlet /></RouterUtilsContext.Provider>;
};

/*

  useNavigate() re-rendering all components is a known bug in react-router
  and might get fixed soon. https://github.com/remix-run/react-router/issues/8349
  Please be aware: when the url changes - this hook will NOT re-render
  Only use it as a utility to push url changes into Router history
  which will then re-render the whole route component.
  Eg. const navigate = useNavigate();
*/
export const useNavigate = () => {
  const { navigateRef } = React.useContext(RouterUtilsContext);
  return navigateRef.current as ReturnType<typeof useNavigateOriginal>;
};

/*
  Please be aware: when the url changes - this hook will NOT re-render
  Only use it as a utility to get latest location object.
  Eg. const location = useLocation();
*/
export const useLocation = () => {
  const { locationRef } = React.useContext(RouterUtilsContext);
  return locationRef.current as ReturnType<typeof useLocationOriginal>;
};

export default RouterUtils;
