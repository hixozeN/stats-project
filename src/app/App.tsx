import './styles/index';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import {
  Suspense, useEffect, useRef, useState,
} from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { useLocation } from 'react-router-dom';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';

function App() {
  const { theme } = useTheme();
  const debouncer = useRef(null);
  const path = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleHeight = () => {
      clearTimeout(debouncer.current);

      debouncer.current = setTimeout(() => {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, 300);
    };

    handleHeight();

    window.addEventListener('resize', handleHeight);

    return () => {
      clearTimeout(debouncer.current);
      window.removeEventListener('resize', handleHeight);
    };
  }, []);

  return (
    <div className={classNames('app', {}, [theme])}>
      {/* suspense для подгрузки чанков с переводами */}
      <Suspense fallback="">
        <Navbar />
        <button type="button" onClick={toggleModal}>toggle</button>
        <Modal isOpen={isOpen} onClose={toggleModal} />
        <div className="page-content">
          {path !== '/' && <Sidebar />}
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
