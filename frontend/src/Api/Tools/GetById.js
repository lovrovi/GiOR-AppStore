import axios from 'Api/AxiosIntance';
import { useQuery } from '@tanstack/react-query';

const getToolById = async (id) => {
  return await axios.get(`/tools/${id}`);
};

export const useGetToolsById = (id, options) => {
  return useQuery(['get-tool-by-id'], () => getToolById(id), {
    select: (data) => data.data,
    ...options,
  });
};
