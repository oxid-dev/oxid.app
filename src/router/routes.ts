import { lazy } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/index'));
const ChatPage = lazy(() => import('@/pages/chat'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const AppBuilderPage = lazy(() => import('@/pages/builder'));

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
    path: '/builder',
    element: AppBuilderPage,
  },
  {
    path: '/settings',
    element: SettingsPage,
  },
];