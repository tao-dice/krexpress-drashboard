import useSWR from 'swr';
import { fetcherWithAuthentication } from '../utils/request';

export const userEndpoint = '/api/users';
export const useUsers = (queryString: string, option = {}) => {
  return useSWR(`${userEndpoint}${queryString}`, fetcherWithAuthentication, option);
};
export const useUserByUsername = (username: string, option = {}) => {
  return useSWR(`${userEndpoint}/${username}`, fetcherWithAuthentication, option);
};

export const useUserLottoBetTransactions = (username: string, queryString: string, option = {}) => {
  return useSWR(`/api/lotto/bet-transactions/member/${username}${queryString}`, fetcherWithAuthentication, option);
};

export const useUserLottoConfig = (username: string, option = {}) => {
  return useSWR(`/api/users/${username}/lotto-config`, fetcherWithAuthentication, option);
};

export const useMe = (option = {}) => {
  return useSWR(`/api/users/me`, fetcherWithAuthentication, option);
};
