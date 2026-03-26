// src/storage/storage.js
import { MMKV } from 'react-native-mmkv';

let storage = null;

const getStorage = () => {
  if (!storage) {
    storage = new MMKV();
  }
  return storage;
};

export const saveAuthData = (token, user, role) => {
  console.log("Saving auth data:", { token, user, role });

  if (typeof token !== "string") {
    console.error("Token must be string, got:", typeof token, token);
  }

  if (typeof role !== "string") {
    console.error("Role must be string, got:", typeof role, role);
  }

  try {
    const storage = getStorage();
    storage.set('token', token);
    storage.set('user', JSON.stringify(user));
    storage.set('role', role);
  } catch (err) {
    console.error("MMKV storage error:", err);
  }
};

export const clearAuthData = () => {
  try {
    const storage = getStorage();
    storage.delete('token');
    storage.delete('user');
    storage.delete('role');
  } catch (err) {
    console.error("MMKV clear error:", err);
  }
};

export const loadAuthData = () => {
  try {
    const storage = getStorage();

    const token = storage.getString('token');
    const user = storage.getString('user');
    const role = storage.getString('role');

    return {
      token,
      user: user ? JSON.parse(user) : null,
      role,
    };
  } catch (err) {
    console.error("MMKV load error:", err);
    return { token: null, user: null, role: null };
  }
};