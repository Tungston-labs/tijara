// src/storage/storage.js
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
export const saveAuthData = (token, user, role) => {
  console.log(" Saving auth data:", { token, user, role });

  if (typeof token !== "string") {
    console.error(" Token must be string, got:", typeof token, token);
  }

  if (typeof role !== "string") {
    console.error(" Role must be string, got:", typeof role, role);
  }

  try {
    storage.set('token', token);
    storage.set('user', JSON.stringify(user));
    storage.set('role', role);
  } catch (err) {
    console.error(" MMKV storage error:", err);
  }
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
