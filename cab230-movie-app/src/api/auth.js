import axios from 'axios';

const API_BASE = 'http://4.237.58.241:3000';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (token) => {
  try {
    const response = await axios.post(`${API_BASE}/user/refresh`, { refreshToken: token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (token) => {
  try {
    const response = await axios.post(`${API_BASE}/user/logout`, { refreshToken: token });
    return response.data;
  } catch (error) {
    throw error;
  }
};