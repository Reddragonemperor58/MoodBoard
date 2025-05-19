import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { MoodboardProvider } from './context/MoodboardContext';
import { ToastProvider } from './context/ToastContext';
import { TourProvider } from './context/TourContext';

// Use HashRouter for GitHub Pages compatibility
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider>
        <TourProvider>
          <MoodboardProvider>
            <App />
          </MoodboardProvider>
        </TourProvider>
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>
);
