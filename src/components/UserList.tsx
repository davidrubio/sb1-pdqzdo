import React from 'react';
import { User } from '../types/User';
import { Users, Home, Phone } from 'lucide-react';

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

export default function UserList({ users, onDelete }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <Users className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Sin residentes</h3>
        <p className="mt-1 text-sm text-gray-500">Comienza agregando un nuevo residente.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Users className="text-indigo-600" />
          Residentes Registrados
        </h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <p className="text-lg font-medium text-gray-900">{user.fullName}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Unidad {user.unitNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {user.emergencyContact}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Registrado el {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}