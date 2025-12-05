import api from "./api";
import { ENDPOINTS } from "../constants/endpoints";

export const fetchEmployees = async (params) => {
  const res = await api.get(ENDPOINTS.EMPLOYEES, { params });
  return res.data;
};

export const getEmployee = async (id) => {
  const res = await api.get(`${ENDPOINTS.EMPLOYEES}/${id}`);
  return res.data.employee;
};

export const createEmployee = async (data) => {
  const res = await api.post(ENDPOINTS.EMPLOYEES, data);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const res = await api.put(`${ENDPOINTS.EMPLOYEES}/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  return res.data;
};
