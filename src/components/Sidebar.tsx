import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Settings, ClipboardList, User, CreditCard, Receipt } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { currentUser } = useAuth();

  const adminMenuItems = [
    { icon: Home, label: 'Panel Principal', path: '/dashboard' },
    { icon: Users, label: 'Residentes', path: '/residents' },
    { icon: CreditCard, label: 'Tipos de Pago', path: '/payment-types' },
    { icon: ClipboardList, label: 'Reportes', path: '/reports' },
    { icon: Settings, label: 'Configuración', path: '/settings' }
  ];

  const residentMenuItems = [
    { icon: User, label: 'Mi Perfil', path: '/profile' },
    { icon: Receipt, label: 'Mis Pagos', path: '/payments' }
  ];

  const menuItems = currentUser?.role === 'admin' ? adminMenuItems : residentMenuItems;

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Users className="h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-xl font-semibold text-gray-900">
          Gestión de Residentes
        </span>
      </div>
      <nav className="mt-6 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}