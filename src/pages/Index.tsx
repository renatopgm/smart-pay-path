import { useState } from 'react';
import { Income, Expense, FinancialSummary } from '@/types/finance';
import { DashboardSummary } from '@/components/DashboardSummary';
import { IncomeForm } from '@/components/IncomeForm';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseCard } from '@/components/ExpenseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, TrendingDown, Plus } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const calculateSummary = (): FinancialSummary => {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses
      .filter(expense => expense.status === 'pending')
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      totalIncome,
      totalExpenses,
      availableBalance: totalIncome - totalExpenses,
    };
  };

  const handleAddIncome = (income: Omit<Income, 'id'>) => {
    const newIncome: Income = {
      ...income,
      id: Date.now().toString(),
    };
    setIncomes([...incomes, newIncome]);
    toast.success('Renda adicionada com sucesso!');
  };

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);
    toast.success('Despesa adicionada com sucesso!');
  };

  const handleTogglePaid = (id: string) => {
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, status: expense.status === 'paid' ? 'pending' : 'paid' }
        : expense
    ));
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      toast.success(
        expense.status === 'paid' 
          ? 'Despesa marcada como não paga' 
          : 'Despesa marcada como paga!'
      );
    }
  };

  const summary = calculateSummary();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-primary p-3">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Controle Financeiro</h1>
              <p className="text-sm text-muted-foreground">Gerencie suas finanças com facilidade</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <DashboardSummary summary={summary} />

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Despesas
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Rendas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6 mt-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Suas Contas</h2>
              {expenses.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhuma despesa cadastrada ainda. Adicione sua primeira conta acima!
                </div>
              ) : (
                <div className="space-y-4">
                  {expenses.map(expense => (
                    <ExpenseCard
                      key={expense.id}
                      expense={expense}
                      onTogglePaid={handleTogglePaid}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="income" className="space-y-6 mt-6">
            <IncomeForm onAddIncome={handleAddIncome} />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Suas Rendas</h2>
              {incomes.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhuma renda cadastrada ainda. Adicione sua primeira fonte de renda acima!
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
