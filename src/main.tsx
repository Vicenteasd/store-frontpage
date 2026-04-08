import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { BasketProvider } from './context/BasketContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BasketProvider>
        <App />
      </BasketProvider>
    </ThemeProvider>
  </StrictMode>,
);
