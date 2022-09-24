import axios from 'Api/AxiosIntance';
import { useQuery } from '@tanstack/react-query';

const getTools = async () => {
  return await axios.get('/tools');
};

export const useGetAllTools = (options) => {
  return useQuery(['get-all-tools'], () => getTools(), {
    select: (data) => data.data,
    ...options,
  });
};
