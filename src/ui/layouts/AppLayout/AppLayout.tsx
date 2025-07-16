import { Outlet } from 'react-router-dom';
import { AppLayoutProps } from './AppLayout.types';

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="dark h-screen w-screen bg-background text-foreground">
      {children || <Outlet />}
    </div>
  );
};

export { AppLayout };