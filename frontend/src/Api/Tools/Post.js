import axios from 'Api/AxiosIntance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const postTools = async (data) => {
  return await axios.post('/tools', data);
};

export const usePostTool = (options) => {
  const queryClient = useQueryClient();

  return useMutation(['post-all-tools'], (data) => postTools(data), {
    onSuccess: () => queryClient.invalidateQueries(['get-all-tools']),
    ...options,
  });
};
