import axios from 'Api/AxiosIntance';
import { useQuery } from '@tanstack/react-query';

const verifyToken = async () => {
  const token = localStorage.getItem('token');

  return await axios.post('/login/verify', token);
};

export const useVerifyToken = (options) => {
  return useQuery(['verify'], () => verifyToken(), {
    ...options,
  });
};
