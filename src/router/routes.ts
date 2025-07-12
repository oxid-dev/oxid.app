import { lazy } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/index'));
const ChatPage = lazy(() => import('@/pages/chat'));
const SettingsPage = lazy(() => import('@/pages/settings'));

export const routes = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/chat',
    element: ChatPage,
  },
  {
    path: '/settings',
    element: SettingsPage,
  },
];