import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This page is no longer needed as we've replaced it with our Dashboard
// Redirecting users to login page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  
  return null;
};

export default Index;
