import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { VerifyPaymentRequest, VerifyPaymentResponse } from '../types';

export const verifyPayment = async (
  data: VerifyPaymentRequest,
): Promise<VerifyPaymentResponse> => {
  return apiClient.post<VerifyPaymentResponse>('/payments/verify', data);
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment,
  });
};
