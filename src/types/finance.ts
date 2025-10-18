export interface Income {
  id: string;
  name: string;
  amount: number;
  date: Date;
  type: 'salary' | 'additional';
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'pending';
  isRecurring: boolean;
  recurrenceType?: 'monthly' | 'quarterly' | 'yearly';
  isInstallment: boolean;
  totalInstallments?: number;
  currentInstallment?: number;
  startDate?: Date;
  endDate?: Date;
  category?: string;
}

export type BillStatus = 'overdue' | 'due-soon' | 'paid' | 'pending';

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  availableBalance: number;
}
