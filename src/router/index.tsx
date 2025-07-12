import { createHashRouter, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from '@/router/routes';
import { AppLayout } from '@/ui/layouts/AppLayout';

// Wrap each route element with Suspense
const createRouteElement = (Element: React.ComponentType) => (
  <Suspense fallback={
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  }>
    <Element />
  </Suspense>
);

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />,
      },
      ...routes.map(route => ({
        path: route.path,
        element: createRouteElement(route.element),
      })),
    ],
  },
]);