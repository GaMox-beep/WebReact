import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { VerifyPaymentRequest, VerifyPaymentResponse } from '../types';

export const verifyPayment = async (
  data: VerifyPaymentRequest,
): Promise<VerifyPaymentResponse> => {
  return apiClient.post<VerifyPaymentResponse>('/payments/verify', data);
};

export const useVerifyPayment = (
  orderId: string | null,
  queryParams?: Record<string, string>,
) => {
  return useQuery({
    queryKey: ['payment-verify', orderId],
    queryFn: () => verifyPayment({ orderId: orderId!, queryParams }),
    enabled: Boolean(orderId),
    staleTime: Infinity,
    retry: false,
  });
};
