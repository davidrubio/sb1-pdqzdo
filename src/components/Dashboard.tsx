import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import UserForm from './UserForm';
import UserList from './UserList';
import Navbar from './Navbar';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <UserForm onSubmit={handleAddUser} />
          </div>
          <div className="space-y-6">
            <UserList users={users} onDelete={handleDeleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
}