import axios from 'Api/AxiosIntance';
import { useMutation } from '@tanstack/react-query';

const login = async (data) => {
  return await axios.post('/login', data);
};

export const useLogin = (options) => {
  return useMutation(['login'], (data) => login(data), {
    onSuccess: (data) => localStorage.setItem('token', data.data),
    ...options,
  });
};
