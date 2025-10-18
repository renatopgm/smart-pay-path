import { useState } from 'react';
import { Income } from '@/types/finance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface IncomeFormProps {
  onAddIncome: (income: Omit<Income, 'id'>) => void;
}

export const IncomeForm = ({ onAddIncome }: IncomeFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'salary' | 'additional'>('salary');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !date) return;

    onAddIncome({
      name,
      amount: parseFloat(amount),
      date: new Date(date),
      type,
    });

    setName('');
    setAmount('');
    setDate('');
    setType('salary');
  };

  return (
    <Card className="border-none shadow-md bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Renda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="income-name">Nome da Renda</Label>
            <Input
              id="income-name"
              placeholder="Ex: Salário Principal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income-amount">Valor (R$)</Label>
              <Input
                id="income-amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income-date">Data de Recebimento</Label>
              <Input
                id="income-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-type">Tipo</Label>
            <Select value={type} onValueChange={(value: 'salary' | 'additional') => setType(value)}>
              <SelectTrigger id="income-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salário Principal</SelectItem>
                <SelectItem value="additional">Renda Adicional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Adicionar Renda
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
