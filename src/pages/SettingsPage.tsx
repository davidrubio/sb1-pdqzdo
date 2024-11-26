import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500">Función de configuración próximamente...</p>
        </div>
      </div>
    </div>
  );
}