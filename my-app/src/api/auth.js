import api from './axios';

export const register = async (data) => {
  const res = await api.post('/auth/register', data);
  console.log(res.data) 
  return res.data;
};

export const login = async (data) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);

  const res = await api.post('/auth/token', formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data;
};
