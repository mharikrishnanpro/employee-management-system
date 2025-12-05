import api from "./api";
import { ENDPOINTS } from "../constants/endpoints";

export const loginUser = async (data) => {
  const res = await api.post(ENDPOINTS.LOGIN, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post(ENDPOINTS.REGISTER, data);
  return res.data;
};
