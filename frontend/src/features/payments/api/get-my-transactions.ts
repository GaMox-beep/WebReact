import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { TransactionsResponse } from '../types';

export const getMyTransactions = async (
  page = 1,
  limit = 10,
): Promise<TransactionsResponse> => {
  return apiClient.get<TransactionsResponse>(
    `/payments/my-transactions?page=${page}&limit=${limit}`,
  );
};

export const useGetMyTransactions = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['my-transactions', page, limit],
    queryFn: () => getMyTransactions(page, limit),
    staleTime: 1000 * 60 * 1, // 1 min cache
    placeholderData: (previousData) => previousData,
  });
};
