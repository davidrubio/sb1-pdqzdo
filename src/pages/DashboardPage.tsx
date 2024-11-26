import React from 'react';
import { Home } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Home className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Panel Principal</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total de Residentes</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">24</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Unidades Activas</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">18</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Acciones Pendientes</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">3</p>
        </div>
      </div>
    </div>
  );
}