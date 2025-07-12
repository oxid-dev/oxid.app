import { Navigate } from 'react-router-dom';

// Home page redirects to chat
const HomePage = () => {
  return <Navigate to="/chat" replace />;
};

export default HomePage;