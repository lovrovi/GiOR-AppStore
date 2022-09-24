import axios from 'Api/AxiosIntance';
import { useMutation } from '@tanstack/react-query';

const putTool = async (id, data) => {
  return await axios.put(`/tools/${id}`, data);
};

export const usePutTool = (id, options) => {
  return useMutation(['put-tool'], (data) => putTool(id, data), {
    ...options,
  });
};
