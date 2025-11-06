import api from './axios';

export const register = async (data) => {
  const res = await api.post('/auth/register', data);
  console.log(res.data) 
  return res.data;
};

export const login = async (data) => {
  const res = await api.post('/auth/token', data);
  console.log(res.data)
  return res.data;
};