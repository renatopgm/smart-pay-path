import { useState } from 'react';
import { Expense } from '@/types/finance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [isInstallment, setIsInstallment] = useState(false);
  const [totalInstallments, setTotalInstallments] = useState('');
  const [currentInstallment, setCurrentInstallment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !dueDate) return;

    onAddExpense({
      name,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      status: 'pending',
      isRecurring,
      recurrenceType: isRecurring ? recurrenceType : undefined,
      isInstallment,
      totalInstallments: isInstallment ? parseInt(totalInstallments) : undefined,
      currentInstallment: isInstallment ? parseInt(currentInstallment) : undefined,
    });

    // Reset form
    setName('');
    setAmount('');
    setDueDate('');
    setIsRecurring(false);
    setIsInstallment(false);
    setTotalInstallments('');
    setCurrentInstallment('');
  };

  return (
    <Card className="border-none shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Despesa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="expense-name">Nome da Conta</Label>
            <Input
              id="expense-name"
              placeholder="Ex: Conta de Água"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expense-amount">Valor (R$)</Label>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expense-date">Data de Vencimento</Label>
              <Input
                id="expense-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="recurring-switch">Despesa Recorrente</Label>
              <p className="text-sm text-muted-foreground">Esta conta se repete?</p>
            </div>
            <Switch
              id="recurring-switch"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
            />
          </div>

          {isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="recurrence-type">Periodicidade</Label>
              <Select value={recurrenceType} onValueChange={(value: any) => setRecurrenceType(value)}>
                <SelectTrigger id="recurrence-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="installment-switch">Financiamento/Parcelamento</Label>
              <p className="text-sm text-muted-foreground">Esta conta é parcelada?</p>
            </div>
            <Switch
              id="installment-switch"
              checked={isInstallment}
              onCheckedChange={setIsInstallment}
            />
          </div>

          {isInstallment && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-installment">Parcela Atual</Label>
                <Input
                  id="current-installment"
                  type="number"
                  placeholder="1"
                  value={currentInstallment}
                  onChange={(e) => setCurrentInstallment(e.target.value)}
                  required={isInstallment}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total-installments">Total de Parcelas</Label>
                <Input
                  id="total-installments"
                  type="number"
                  placeholder="12"
                  value={totalInstallments}
                  onChange={(e) => setTotalInstallments(e.target.value)}
                  required={isInstallment}
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            Adicionar Despesa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
