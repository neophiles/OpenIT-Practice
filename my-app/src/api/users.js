import api from './axios';

export const userUpdate = async (data) => {
    const res = await api.patch('users/me', data);
    console.log(res.data)
    return res.data;
}
