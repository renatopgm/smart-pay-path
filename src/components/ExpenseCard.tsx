import { Expense } from '@/types/finance';
import { getBillStatus, getStatusColor, formatCurrency } from '@/lib/financeUtils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, Clock, AlertCircle, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ExpenseCardProps {
  expense: Expense;
  onTogglePaid: (id: string) => void;
}

export const ExpenseCard = ({ expense, onTogglePaid }: ExpenseCardProps) => {
  const status = getBillStatus(expense);
  const statusColor = getStatusColor(status);

  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
        return <Check className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      case 'due-soon':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const installmentProgress = expense.isInstallment && expense.currentInstallment && expense.totalInstallments
    ? (expense.currentInstallment / expense.totalInstallments) * 100
    : 0;

  return (
    <Card className="border-none shadow-md bg-gradient-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{expense.name}</h3>
              <Badge className={`${statusColor} border-none`}>
                <span className="flex items-center gap-1">
                  {getStatusIcon()}
                  {status === 'paid' ? 'Pago' : status === 'overdue' ? 'Atrasado' : status === 'due-soon' ? 'Vence em breve' : 'Pendente'}
                </span>
              </Badge>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">
                {formatCurrency(expense.amount)}
              </span>
              <span className="text-sm text-muted-foreground">
                Vence em {format(expense.dueDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
            </div>

            {expense.isInstallment && expense.currentInstallment && expense.totalInstallments && (
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Parcela {expense.currentInstallment} de {expense.totalInstallments}</span>
                </div>
                <Progress value={installmentProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(installmentProgress)}% concluído
                </p>
              </div>
            )}

            {expense.isRecurring && (
              <Badge variant="outline" className="w-fit">
                Recorrente - {expense.recurrenceType === 'monthly' ? 'Mensal' : expense.recurrenceType === 'quarterly' ? 'Trimestral' : 'Anual'}
              </Badge>
            )}
          </div>

          <Button
            onClick={() => onTogglePaid(expense.id)}
            variant={expense.status === 'paid' ? 'secondary' : 'default'}
            size="sm"
          >
            {expense.status === 'paid' ? 'Marcar como Não Pago' : 'Marcar como Pago'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
