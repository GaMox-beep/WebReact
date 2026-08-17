import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { RechargePackage } from '../types';

export const getRechargePackages = async (): Promise<RechargePackage[]> => {
  return apiClient.get<RechargePackage[]>('/payments/packages');
};

export const useGetRechargePackages = () => {
  return useQuery({
    queryKey: ['recharge-packages'],
    queryFn: getRechargePackages,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};
