// src/storage/storage.js
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const saveAuthData = (token, user, role) => {
  storage.set('token', token);
  storage.set('user', JSON.stringify(user));
  storage.set('role', role);
};

export const clearAuthData = () => {
  storage.delete('token');
  storage.delete('user');
  storage.delete('role');
};

export const loadAuthData = () => {
  const token = storage.getString('token');
  const user = storage.getString('user');
  const role = storage.getString('role');

  return {
    token,
    user: user ? JSON.parse(user) : null,
    role,
  };
};
