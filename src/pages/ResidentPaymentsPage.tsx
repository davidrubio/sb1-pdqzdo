import React, { useState, useEffect } from 'react';
import { Receipt, Download, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PaymentType, Payment } from '../types/Payment';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';

export default function ResidentPaymentsPage() {
  const { currentUser } = useAuth();
  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('payments');
    return saved ? JSON.parse(saved) : [];
  });
  const [paymentTypes] = useState<PaymentType[]>(() => {
    const saved = localStorage.getItem('paymentTypes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const handlePayment = (paymentId: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId
        ? { ...payment, paid: true, paidAt: new Date().toISOString() }
        : payment
    ));
  };

  const generateReceipt = (payment: Payment) => {
    const paymentType = paymentTypes.find(type => type.id === payment.paymentTypeId);
    if (!paymentType || !currentUser) return;

    const doc = new jsPDF();
    
    // Add receipt content
    doc.setFontSize(20);
    doc.text('Recibo de Pago', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Fecha: ${format(new Date(payment.paidAt!), 'dd/MM/yyyy')}`, 20, 40);
    doc.text(`Residente: ${currentUser.fullName}`, 20, 50);
    doc.text(`Unidad: ${currentUser.unitNumber}`, 20, 60);
    doc.text(`Concepto: ${paymentType.name}`, 20, 70);
    doc.text(`Monto: $${paymentType.amount.toFixed(2)}`, 20, 80);
    
    // Save the PDF
    doc.save(`recibo-${paymentType.name}-${format(new Date(payment.paidAt!), 'yyyyMMdd')}.pdf`);
  };

  const userPayments = payments.filter(payment => payment.userId === currentUser?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Receipt className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Mis Pagos</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Concepto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Vencimiento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userPayments.map(payment => {
              const paymentType = paymentTypes.find(type => type.id === payment.paymentTypeId);
              if (!paymentType) return null;

              return (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {paymentType.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${paymentType.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(payment.dueDate), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.paid ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        Pagado
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <XCircle className="h-5 w-5 mr-1" />
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!payment.paid ? (
                      <button
                        onClick={() => handlePayment(payment.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Marcar como Pagado
                      </button>
                    ) : (
                      <button
                        onClick={() => generateReceipt(payment)}
                        className="flex items-center text-indigo-600 hover:text-indigo-900"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Descargar Recibo
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}