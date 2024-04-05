import { toast as originalToast } from 'react-hot-toast';
import { useCallback } from 'react';

const toastOptions = {
  duration: 5000,
  style: {
    background: '#1d1d21',
    color: '#f8f8f8',
  },
};

export const useToasts = () => {
  const toastWithError = useCallback((text: string) => {
    originalToast.error(text, toastOptions);
  }, []);

  const toast = useCallback((text: string) => {
    originalToast(text, toastOptions);
  }, []);

  const toastSuccess = useCallback((text: string) => {
    originalToast.success(text, toastOptions);
  }, []);

  const toastLoading = useCallback((text: string) => {
    originalToast.loading(text, toastOptions);
  }, []);

  return {
    toast,
    toastWithError,
    toastSuccess,
    toastLoading,
  };
};
