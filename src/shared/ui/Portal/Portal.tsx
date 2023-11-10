import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal = (props: IPortalProps) => {
  const {
    children,
    element = document.body,
  } = props;

  return createPortal(children, element);
};
