import axios from 'Api/AxiosIntance';
import { useQuery } from '@tanstack/react-query';

const getProducers = async () => {
  return await axios.get('/producers');
};

export const useGetAllProducers = (options) => {
  return useQuery(['get-all-producers'], () => getProducers(), {
    select: (data) => data.data,
    ...options,
  });
};
