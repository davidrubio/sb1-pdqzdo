import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ResidentProfilePage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <User className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nombre Completo</h3>
            <p className="mt-1 text-lg text-gray-900">{currentUser.fullName}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Número de Unidad</h3>
            <p className="mt-1 text-lg text-gray-900">{currentUser.unitNumber}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contacto de Emergencia</h3>
            <p className="mt-1 text-lg text-gray-900">{currentUser.emergencyContact}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Usuario</h3>
            <p className="mt-1 text-lg text-gray-900">{currentUser.username}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Fecha de Registro</h3>
            <p className="mt-1 text-lg text-gray-900">
              {new Date(currentUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}