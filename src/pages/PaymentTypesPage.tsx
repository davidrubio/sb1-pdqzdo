import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { PaymentType, PaymentFrequency } from '../types/Payment';

export default function PaymentTypesPage() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>(() => {
    const saved = localStorage.getItem('paymentTypes');
    return saved ? JSON.parse(saved) : [];
  });

  const [newPaymentType, setNewPaymentType] = useState({
    name: '',
    amount: '',
    frequency: 'monthly' as PaymentFrequency
  });

  useEffect(() => {
    localStorage.setItem('paymentTypes', JSON.stringify(paymentTypes));
  }, [paymentTypes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentType: PaymentType = {
      id: crypto.randomUUID(),
      name: newPaymentType.name,
      amount: Number(newPaymentType.amount),
      frequency: newPaymentType.frequency,
      createdAt: new Date().toISOString()
    };
    setPaymentTypes(prev => [...prev, paymentType]);
    setNewPaymentType({ name: '', amount: '', frequency: 'monthly' });
  };

  const handleDelete = (id: string) => {
    setPaymentTypes(prev => prev.filter(type => type.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CreditCard className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Tipos de Pago</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Pago
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={newPaymentType.name}
                onChange={e => setNewPaymentType(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monto
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={newPaymentType.amount}
                onChange={e => setNewPaymentType(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Frecuencia
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={newPaymentType.frequency}
                onChange={e => setNewPaymentType(prev => ({ ...prev, frequency: e.target.value as PaymentFrequency }))}
              >
                <option value="once">Único</option>
                <option value="monthly">Mensual</option>
                <option value="yearly">Anual</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Crear Tipo de Pago
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {paymentTypes.map(type => (
            <div key={type.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">{type.name}</h3>
                <p className="text-sm text-gray-500">
                  ${type.amount.toFixed(2)} - 
                  {type.frequency === 'once' && ' Pago Único'}
                  {type.frequency === 'monthly' && ' Mensual'}
                  {type.frequency === 'yearly' && ' Anual'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(type.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}