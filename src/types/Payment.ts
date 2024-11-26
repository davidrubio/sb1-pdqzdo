export type PaymentFrequency = 'once' | 'monthly' | 'yearly';

export interface PaymentType {
  id: string;
  name: string;
  amount: number;
  frequency: PaymentFrequency;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  paymentTypeId: string;
  paid: boolean;
  paidAt?: string;
  dueDate: string;
  createdAt: string;
}