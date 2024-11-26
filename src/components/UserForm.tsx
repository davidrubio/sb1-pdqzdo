import React, { useState } from 'react';
import { User } from '../types/Auth';
import { UserPlus } from 'lucide-react';

interface UserFormProps {
  onSubmit: (user: User) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    unitNumber: '',
    emergencyContact: '',
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: crypto.randomUUID(),
      role: 'resident',
      ...formData,
      createdAt: new Date().toISOString()
    };
    onSubmit(newUser);
    setFormData({
      fullName: '',
      unitNumber: '',
      emergencyContact: '',
      username: '',
      password: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="flex items-center justify-center space-x-2 text-indigo-600">
        <UserPlus size={28} />
        <h2 className="text-2xl font-bold">Registrar Nuevo Residente</h2>
      </div>
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          id="fullName"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Usuario
        </label>
        <input
          type="text"
          id="username"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700">
          Número de Unidad
        </label>
        <input
          type="text"
          id="unitNumber"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.unitNumber}
          onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
          Contacto de Emergencia
        </label>
        <input
          type="tel"
          id="emergencyContact"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={formData.emergencyContact}
          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Registrar Residente
      </button>
    </form>
  );
}