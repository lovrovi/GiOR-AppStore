import axios from 'Api/AxiosIntance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteTool = async (id) => {
  return await axios.delete(`/tools/${id}`);
};

export const useDeleteTool = (options) => {
  const queryClient = useQueryClient();

  return useMutation(['delete-tool'], (id) => deleteTool(id), {
    onSuccess: () => queryClient.invalidateQueries(['get-all-tools']),
    ...options,
  });
};
