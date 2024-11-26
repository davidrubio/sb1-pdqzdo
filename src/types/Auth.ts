export type UserRole = 'admin' | 'resident';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  fullName: string;
  unitNumber: string;
  emergencyContact: string;
  createdAt: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}