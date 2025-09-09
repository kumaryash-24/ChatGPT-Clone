// lib/auth.ts

export interface User {
  name: string;
  email: string;
  password?: string; // Optional for social logins (if not setting a local password)
  provider: string; // e.g., 'Email/Password', 'Google', 'Microsoft', 'Apple'
}

export const getRegisteredUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  }
  return [];
};

export const saveRegisteredUsers = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
  return null;
};

export const saveCurrentUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};

export const removeCurrentUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
};