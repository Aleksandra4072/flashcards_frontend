import axios from "../api/axios.js";
import { notification } from 'antd';

const openNotificationWithIcon = (message) => {
  notification.error({
    message,
  });
};

export const signup = async (params) => {
  try {
    return await axios.post("/auth/signup", params);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (params) => {
  try {
    return await axios.post("/auth/login", params);
  } catch (e) {
    openNotificationWithIcon(e.response.data.detail);
  }
};

export const refreshToken = async () => {
  try {
    return await axios.get("/auth/refresh_token", );
  } catch (error) {
    console.log(error);
    return { message: "Failed to refresh token" };
  }
};

export const logout = async () => {
  try {
    return await axios.post("/auth/logout");
  } catch (error) {
    console.log(error);
    return { message: "Failed to refresh token" };
  }
};

export const decodeToken = async (token) => {
  return await axios.post(`/auth/decode_token`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
