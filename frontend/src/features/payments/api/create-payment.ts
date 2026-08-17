import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { CreatePaymentRequest, CreatePaymentResponse } from '../types';

export const createPayment = async (
  data: CreatePaymentRequest,
): Promise<CreatePaymentResponse> => {
  return apiClient.post<CreatePaymentResponse>('/payments/create', data);
};

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};
