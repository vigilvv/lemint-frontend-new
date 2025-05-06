import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreatePage from './pages/CreatePage';
import NewPage from './pages/NewPage';
import MarketPage from './pages/MarketPage';
import CollabPage from './pages/CollabPage';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'create',
        element: <CreatePage />
      },
      {
        path: 'new',
        element: <NewPage />
      },
      {
        path: 'market',
        element: <MarketPage />
      },
      {
        path: 'collab',
        element: <CollabPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);