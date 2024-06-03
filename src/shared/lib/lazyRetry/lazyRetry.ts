import { ComponentType, lazy } from 'react';

function lazyRetry<T extends ComponentType<any>>(
  componentImport: Parameters<typeof lazy<T>>[0],
  chunkIdentifier: string,
): Promise<{ default: T }> {
  const sessionStorageKey = `retry-lazy-refreshed-${chunkIdentifier}`;

  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed due to this chunk
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem(sessionStorageKey) || 'false',
    );

    // try to import the component
    componentImport()
      .then((component) => {
        // success so reset the refresh state
        window.sessionStorage.setItem(sessionStorageKey, 'false');
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem(sessionStorageKey, 'true');
          // refresh the page
          return window.location.reload();
        }

        // Default error behaviour as already tried refresh
        return reject(error);
      });
  });
}

export default lazyRetry;
