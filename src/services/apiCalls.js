import axios from "axios";

const API_URL = "http://localhost:3000/";

export const loginCall = async (credentials) => {
  console.log(credentials);
  const res = await axios.post(`${API_URL}api/auth/login`, credentials);
  console.log(res);
  return res;
};

export const registerNewUserCall = async (credentials) => {
  return await axios.post(`${API_URL}api/auth/register`, credentials);
};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}api/users/profile`, config);
  console.log(res);
  return res.data;
};

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(`${API_URL}api/users/profile`, data, config);
  console.log(res, "yo soy updateProfile");
  return res;
};

export const bringAllUsersCall = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${API_URL}api/users`, config);
};

export const deleteUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${API_URL}api/user/${id}`, config);
};
