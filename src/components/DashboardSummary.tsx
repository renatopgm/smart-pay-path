import { FinancialSummary } from '@/types/finance';
import { formatCurrency } from '@/lib/financeUtils';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardSummaryProps {
  summary: FinancialSummary;
}

export const DashboardSummary = ({ summary }: DashboardSummaryProps) => {
  const isPositiveBalance = summary.availableBalance >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-md bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receita Total
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(summary.totalIncome)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesas Totais
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(summary.totalExpenses)}
          </div>
        </CardContent>
      </Card>

      <Card className={`border-none shadow-md ${
        isPositiveBalance ? 'bg-gradient-success' : 'bg-warning'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${
            isPositiveBalance ? 'text-success-foreground/80' : 'text-warning-foreground/80'
          }`}>
            Saldo Disponível
          </CardTitle>
          <Wallet className={`h-4 w-4 ${
            isPositiveBalance ? 'text-success-foreground' : 'text-warning-foreground'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            isPositiveBalance ? 'text-success-foreground' : 'text-warning-foreground'
          }`}>
            {formatCurrency(summary.availableBalance)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
