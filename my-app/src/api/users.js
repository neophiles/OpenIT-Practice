import api from './axios';

export const userUpdate = async (data, token) => {
  const res = await api.patch("/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
