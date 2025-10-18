import { Expense, BillStatus } from '@/types/finance';
import { differenceInDays } from 'date-fns';

export const getBillStatus = (expense: Expense): BillStatus => {
  if (expense.status === 'paid') {
    return 'paid';
  }

  const today = new Date();
  const daysUntilDue = differenceInDays(expense.dueDate, today);

  if (daysUntilDue < 0) {
    return 'overdue';
  }

  if (daysUntilDue <= 5) {
    return 'due-soon';
  }

  return 'pending';
};

export const getStatusColor = (status: BillStatus): string => {
  const colors: Record<BillStatus, string> = {
    overdue: 'bg-overdue text-overdue-foreground',
    'due-soon': 'bg-warning text-warning-foreground',
    paid: 'bg-success text-success-foreground',
    pending: 'bg-muted text-muted-foreground',
  };

  return colors[status];
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const calculateInstallmentProgress = (
  currentInstallment: number,
  totalInstallments: number
): number => {
  return (currentInstallment / totalInstallments) * 100;
};
