import { Outlet } from 'react-router-dom';
import { AppLayoutProps } from './AppLayout.types';

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Header/Navigation - can be added later */}
      
      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export { AppLayout };