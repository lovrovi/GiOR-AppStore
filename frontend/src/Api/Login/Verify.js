import axios from 'Api/AxiosIntance';
import { useQuery } from '@tanstack/react-query';

const verifyToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) return false;

  return await axios
    .get('/login/verify', { params: { token: token } })
    .catch((err) => {
      if (
        (err.response.status === 404 &&
          err.response.data === 'Token not found') ||
        (err.response.status === 400 && err.response.data === 'Token expired')
      )
        return false;
    });
};

export const useVerifyToken = (options) => {
  return useQuery(['verify'], () => verifyToken(), {
    ...options,
  });
};
