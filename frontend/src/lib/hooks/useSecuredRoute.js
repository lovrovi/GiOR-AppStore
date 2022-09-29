import { useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';
import { routes } from 'Router/router';
import { useVerifyToken } from 'Api/Login/Verify';

export const useSecuredRoute = () => {
  const navigate = useNavigate();

  const { data } = useVerifyToken();

  useEffect(() => {
    if (data === false) {
      localStorage.removeItem('token');
      navigate(generatePath(routes.LOGIN));
    }
  }, [data, navigate]);
};
