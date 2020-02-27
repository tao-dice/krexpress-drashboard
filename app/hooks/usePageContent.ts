import useSWR from 'swr';
import { fetcherWithAuthentication } from '../utils/request';

export const endpoint = '/api/page-content';
export const usePageContent = (qs: string, option = {}) => {
  return useSWR(`${endpoint}${qs}`, fetcherWithAuthentication, option);
};
