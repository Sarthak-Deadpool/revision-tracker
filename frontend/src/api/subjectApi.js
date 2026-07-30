/** @format */

import api from "./axios";

export const getSubjects = async () => {
  const response = await api.get("/subjects");
  return response.data;
};

export const getSubjectById = async (id) => {
  const response = await api.get(`/subjects/${id}`);
  return response.data;
};

export const createSubject = async (data) => {
  const response = await api.post("/subjects", data);
  return response.data;
};

export const updateSubject = async (id, data) => {
  const response = await api.patch(`/subjects/${id}`, data);
  return response.data;
};

export const deleteSubject = async (id) => {
  const response = await api.delete(`/subjects/${id}`);
  return response.data;
};
