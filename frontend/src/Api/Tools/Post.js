import axios from 'Api/AxiosIntance';
import { useMutation } from '@tanstack/react-query';

const postTools = async (data) => {
  return await axios.post('/tools', data);
};

export const usePostTool = (options) => {
  return useMutation(['post-all-tools'], (data) => postTools(data), {
    ...options,
  });
};
