import React from 'react';
import { Users } from 'lucide-react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function ResidentsPage() {
  const [users, setUsers] = React.useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter(user => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Residents</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <UserForm onSubmit={handleAddUser} />
        </div>
        <div className="space-y-6">
          <UserList users={users} onDelete={handleDeleteUser} />
        </div>
      </div>
    </div>
  );
}